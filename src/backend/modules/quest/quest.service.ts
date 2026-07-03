import { prisma } from "@/backend/shared/database/prisma";
import { Prisma } from "@/generated/client";

export function getTodayDateString(): string {
  // Trả về YYYY-MM-DD theo múi giờ Việt Nam (GMT+7)
  return new Date().toLocaleDateString("sv-SE", { timeZone: "Asia/Ho_Chi_Minh" });
}

export class QuestService {
  /**
   * Lấy danh sách nhiệm vụ hôm nay của user. Nếu chưa có, tự động tạo mới từ QuestDefinition.
   */
  static async getOrCreateTodayQuests(userId: string) {
    const todayStr = getTodayDateString();

    // 1. Kiểm tra User có tồn tại không
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { id: true },
    });
    if (!user) {
      throw new Error(`Không tìm thấy người dùng với ID: ${userId}`);
    }

    // 2. Lấy cấu hình các nhiệm vụ đang hoạt động
    const activeDefs = await prisma.questDefinition.findMany({
      where: { isActive: true },
    });

    // 3. Lấy các nhiệm vụ đã có của User hôm nay
    const existingQuests = await prisma.userQuest.findMany({
      where: { userId, date: todayStr },
      include: { definition: true },
    });

    // 4. Nếu thiếu nhiệm vụ nào, tự động tạo bổ sung
    if (existingQuests.length < activeDefs.length) {
      const existingTypes = new Set(existingQuests.map((q) => q.questType));
      const missingDefs = activeDefs.filter((d) => !existingTypes.has(d.questType));

      if (missingDefs.length > 0) {
        await prisma.userQuest.createMany({
          data: missingDefs.map((d) => ({
            userId,
            questType: d.questType,
            target: d.target,
            rewardStars: d.rewardStars,
            date: todayStr,
            progress: 0,
            isCompleted: false,
            isClaimed: false,
          })),
          skipDuplicates: true,
        });

        // Tải lại toàn bộ sau khi đã chèn bổ sung
        return prisma.userQuest.findMany({
          where: { userId, date: todayStr },
          include: { definition: true },
          orderBy: { questType: "asc" },
        });
      }
    }

    return existingQuests.sort((a, b) => a.questType.localeCompare(b.questType));
  }

  /**
   * Cộng dồn tiến trình cho một nhiệm vụ cụ thể.
   * Hỗ trợ truyền Prisma Transaction Client (tx) để đồng bộ dữ liệu an toàn từ Worker.
   */
  static async incrementProgress(
    userId: string,
    questType: string,
    amount: number = 1,
    tx?: Prisma.TransactionClient
  ) {
    const todayStr = getTodayDateString();
    const client = tx || prisma;

    // Lấy thông tin nhiệm vụ của hôm nay
    let quest = await client.userQuest.findUnique({
      where: {
        userId_questType_date: { userId, questType, date: todayStr },
      },
    });

    // Nếu chưa được khởi tạo hôm nay, tiến hành khởi tạo
    if (!quest) {
      await QuestService.getOrCreateTodayQuests(userId);
      quest = await client.userQuest.findUnique({
        where: {
          userId_questType_date: { userId, questType, date: todayStr },
        },
      });
    }

    // Nếu không tìm thấy cấu hình hoặc nhiệm vụ đã hoàn thành từ trước, bỏ qua
    if (!quest || quest.isCompleted) {
      return quest;
    }

    const newProgress = Math.min(quest.progress + amount, quest.target);
    const isCompleted = newProgress >= quest.target;

    return client.userQuest.update({
      where: { id: quest.id },
      data: {
        progress: newProgress,
        isCompleted,
      },
    });
  }

  /**
   * Thực hiện Điểm danh (CHECKIN) hàng ngày.
   * Hoàn thành và nhận thưởng ngay lập tức.
   */
  static async checkIn(userId: string) {
    const todayStr = getTodayDateString();

    return prisma.$transaction(async (tx) => {
      // Đảm bảo các nhiệm vụ đã được khởi tạo
      await QuestService.getOrCreateTodayQuests(userId);

      const quest = await tx.userQuest.findUnique({
        where: {
          userId_questType_date: { userId, questType: "CHECKIN", date: todayStr },
        },
      });

      if (!quest) {
        throw new Error("Không tìm thấy nhiệm vụ Điểm danh!");
      }

      if (quest.isClaimed) {
        throw new Error("Bạn đã điểm danh và nhận thưởng ngày hôm nay rồi!");
      }

      // 1. Cập nhật tiến trình hoàn thành và đã nhận
      const updatedQuest = await tx.userQuest.update({
        where: { id: quest.id },
        data: {
          progress: quest.target,
          isCompleted: true,
          isClaimed: true,
        },
      });

      // 2. Cộng sao thưởng trực tiếp vào số dư của user
      const userForCheckin = await tx.user.findUnique({
        where: { id: userId },
        select: { starBalance: true }
      });
      if (!userForCheckin) {
        throw new Error("Không tìm thấy người dùng!");
      }
      const balanceBefore = userForCheckin.starBalance;
      const balanceAfter = balanceBefore + quest.rewardStars;

      const updatedUser = await tx.user.update({
        where: { id: userId },
        data: {
          starBalance: balanceAfter,
        },
      });

      // Ghi sổ cái StarLedger cho Check-in
      await tx.starLedger.create({
        data: {
          userId,
          type: "QUEST_REWARD",
          amount: quest.rewardStars,
          balanceBefore,
          balanceAfter,
          questId: quest.id,
          note: `Nhận thưởng nhiệm vụ: Điểm danh hàng ngày (+${quest.rewardStars} sao)`,
        },
      });

      return {
        quest: updatedQuest,
        rewardStars: quest.rewardStars,
        newBalance: updatedUser.starBalance,
      };
    });
  }

  /**
   * Nhận Sao thưởng cho nhiệm vụ đã hoàn thành.
   */
  static async claimReward(userId: string, questType: string) {
    const todayStr = getTodayDateString();

    return prisma.$transaction(async (tx) => {
      const quest = await tx.userQuest.findUnique({
        where: {
          userId_questType_date: { userId, questType, date: todayStr },
        },
      });

      if (!quest) {
        throw new Error("Không tìm thấy nhiệm vụ hôm nay!");
      }

      if (!quest.isCompleted) {
        throw new Error("Nhiệm vụ này chưa được hoàn thành!");
      }

      if (quest.isClaimed) {
        throw new Error("Bạn đã nhận phần thưởng của nhiệm vụ này rồi!");
      }

      // 1. Đánh dấu đã nhận thưởng
      const updatedQuest = await tx.userQuest.update({
        where: { id: quest.id },
        data: { isClaimed: true },
      });

      // 2. Cộng sao thưởng vào User
      const userForReward = await tx.user.findUnique({
        where: { id: userId },
        select: { starBalance: true }
      });
      if (!userForReward) {
        throw new Error("Không tìm thấy người dùng!");
      }
      const balanceBefore = userForReward.starBalance;
      const balanceAfter = balanceBefore + quest.rewardStars;

      const updatedUser = await tx.user.update({
        where: { id: userId },
        data: {
          starBalance: balanceAfter,
        },
      });

      // Ghi sổ cái StarLedger cho nhận thưởng nhiệm vụ thông thường
      await tx.starLedger.create({
        data: {
          userId,
          type: "QUEST_REWARD",
          amount: quest.rewardStars,
          balanceBefore,
          balanceAfter,
          questId: quest.id,
          note: `Nhận thưởng nhiệm vụ: ${quest.questType} (+${quest.rewardStars} sao)`,
        },
      });

      return {
        quest: updatedQuest,
        rewardStars: quest.rewardStars,
        newBalance: updatedUser.starBalance,
      };
    });
  }
}
