import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { prisma } from "@/backend/shared/database/prisma";
import { getTodayDateString } from "@/backend/modules/quest/quest.service";
import { verifyJWT } from "@/backend/shared/security/jwt";
import QuestManager from "./QuestManager";

export const dynamic = "force-dynamic";

export default async function BackOfficeQuestsPage() {
  const secret = process.env.BACKOFFICE_SECRET || "livestar-backoffice-dev-2026";
  const cookieStore = await cookies();
  const token = cookieStore.get("backoffice_token")?.value;

  const payload = token ? verifyJWT(token, secret) : null;
  if (!payload || payload.role !== "backoffice_admin") {
    redirect("/backoffice/login");
  }

  const todayStr = getTodayDateString();

  // 1. Tải danh sách cấu hình định nghĩa nhiệm vụ từ Database
  const definitions = await prisma.questDefinition.findMany({
    orderBy: { questType: "asc" },
  });

  // 2. Thống kê sơ bộ hoạt động trong ngày hôm nay
  const statsRaw = await prisma.userQuest.groupBy({
    by: ["questType", "isCompleted", "isClaimed"],
    where: { date: todayStr },
    _count: {
      id: true,
    },
  });

  return (
    <QuestManager
      initialDefinitions={JSON.parse(JSON.stringify(definitions))}
      initialStats={JSON.parse(JSON.stringify(statsRaw))}
      todayDate={todayStr}
    />
  );
}
