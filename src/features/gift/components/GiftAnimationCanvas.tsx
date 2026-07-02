// Component Canvas vẽ hoạt họa bay sao thời gian thực (Real-time Gifting Particle Engine).
// Lắng nghe dữ liệu quà tặng đổi mới để kích hoạt hiệu ứng sao bay, bão nổ và vương miện lơ lửng.

"use client";

import React, { useEffect, useRef } from "react";

interface GiftEvent {
  id: string;
  amount: number;
}

interface GiftAnimationCanvasProps {
  giftEvent: GiftEvent | null;
  styles: any;
}

export default function GiftAnimationCanvas({ giftEvent, styles }: GiftAnimationCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particlesRef = useRef<any[]>([]);
  const frameIdRef = useRef<number | null>(null);

  // 1. Tự động lắng nghe sự kiện quà tặng mới để sinh hạt hiệu ứng
  useEffect(() => {
    if (giftEvent) {
      triggerStarEffects(giftEvent.amount);
    }
  }, [giftEvent]);

  // 2. Khởi chạy vòng lặp hoạt họa (Animation Loop)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Đặt kích thước canvas khớp với vùng chứa cha của nó
    const resizeCanvas = () => {
      canvas.width = canvas.parentElement?.clientWidth || 800;
      canvas.height = canvas.parentElement?.clientHeight || 450;
    };
    
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const update = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const particles = particlesRef.current;
      
      // Cập nhật tọa độ và tuổi thọ (life) của từng hạt
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.life -= p.decay;

        // Xóa các hạt đã hết tuổi thọ để giải phóng RAM
        if (p.life <= 0) {
          particles.splice(i, 1);
          continue;
        }

        p.y += p.vy;
        p.x += p.vx;
        
        if (p.type === "star") {
          // Sao bay dao động ngang hình Sin
          p.x += Math.sin(p.y * 0.05 + p.swayOffset) * p.swayWidth;
          drawStar(ctx, p.x, p.y, 5, p.size, p.size / 2, p.color, p.life);
        } else if (p.type === "burst" || p.type === "fire") {
          // Hạt bùng nổ chịu ảnh hưởng của trọng lực
          if (p.type === "burst") p.vy += 0.08; 
          ctx.fillStyle = p.color;
          ctx.globalAlpha = p.life;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
          ctx.globalAlpha = 1.0;
        } else if (p.type === "diamond") {
          p.vy += 0.04;
          ctx.save();
          ctx.globalAlpha = p.life;
          ctx.fillStyle = p.color;
          ctx.translate(p.x, p.y);
          ctx.rotate(p.rotation || 0);
          if (p.rotation !== undefined && p.rotSpeed !== undefined) {
            p.rotation += p.rotSpeed;
          }
          ctx.beginPath();
          ctx.moveTo(0, -p.size);
          ctx.lineTo(p.size * 0.7, 0);
          ctx.lineTo(0, p.size);
          ctx.lineTo(-p.size * 0.7, 0);
          ctx.closePath();
          ctx.fill();
          ctx.restore();
        } else if (p.type === "rocket") {
          // Sinh lửa phản lực phía sau tên lửa
          if (Math.random() < 0.5) {
            particles.push({
              type: "fire",
              x: p.x,
              y: p.y + p.size / 2,
              vx: Math.random() * 2 - 1,
              vy: Math.random() * 2 + 1,
              size: Math.random() * 5 + 3,
              life: 1.0,
              decay: 0.03,
              color: Math.random() > 0.4 ? "#ff007f" : "#ffb703"
            });
          }
          ctx.save();
          ctx.globalAlpha = p.life;
          ctx.font = `${p.size}px Outfit, sans-serif`;
          ctx.textAlign = "center";
          ctx.fillText("🚀", p.x, p.y);
          ctx.restore();
        } else if (p.type === "crown") {
          p.vy += p.gravity;
          ctx.save();
          ctx.globalAlpha = p.life;
          ctx.font = `${p.size}px Outfit, sans-serif`;
          ctx.textAlign = "center";
          ctx.fillText("👑", p.x, p.y);
          ctx.restore();
        } else if (p.type === "ring") {
          p.size += p.growthRate || 1.5;
          ctx.save();
          ctx.globalAlpha = p.life;
          ctx.strokeStyle = p.color;
          ctx.lineWidth = 3;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.stroke();
          ctx.restore();
        }
      }

      frameIdRef.current = requestAnimationFrame(update);
    };

    update();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      if (frameIdRef.current) {
        cancelAnimationFrame(frameIdRef.current);
      }
    };
  }, []);

  // Hàm sinh hạt tương ứng với giá trị quà tặng
  const triggerStarEffects = (amount: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const particles = particlesRef.current;

    // Gói 1: Sao Lẻ (1 sao) -> Một vài ngôi sao bay lên ở góc phải
    if (amount === 1) {
      for (let i = 0; i < 15; i++) {
        particles.push({
          type: "star",
          x: canvas.width - 50 - Math.random() * 80,
          y: canvas.height - 20,
          vx: -(Math.random() * 2 + 0.5),
          vy: -(Math.random() * 4 + 2),
          size: Math.random() * 10 + 6,
          life: 1.0,
          decay: Math.random() * 0.015 + 0.008,
          swayWidth: Math.random() * 1.5 + 0.5,
          swayOffset: Math.random() * 100,
          color: i % 2 === 0 ? "#ffb703" : "#ff007f"
        });
      }
    }

    // Gói 2: Bão Sao (10 sao) -> Trút mưa sao chéo từ góc trên xuống khắp màn hình
    else if (amount === 10) {
      for (let i = 0; i < 40; i++) {
        particles.push({
          type: "star",
          x: Math.random() * canvas.width,
          y: -20,
          vx: Math.random() * 1.5 - 0.5,
          vy: Math.random() * 3 + 3,
          size: Math.random() * 12 + 6,
          life: 1.0,
          decay: 0.012,
          swayWidth: Math.random() * 2 + 0.5,
          swayOffset: Math.random() * 200,
          color: i % 2 === 0 ? "#ffb703" : "#00b4d8"
        });
      }
    }

    // Gói 3: Kim Cương (100 sao) -> Bùng nổ kim cương lấp lánh từ trung tâm
    else if (amount === 100) {
      const cx = canvas.width / 2;
      const cy = canvas.height / 2;
      for (let i = 0; i < 60; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 5 + 2;
        particles.push({
          type: "diamond",
          x: cx,
          y: cy,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          size: Math.random() * 8 + 6,
          rotation: Math.random() * Math.PI,
          rotSpeed: Math.random() * 0.06 - 0.03,
          life: 1.0,
          decay: Math.random() * 0.015 + 0.01,
          color: `hsl(${200 + Math.random() * 120}, 100%, 75%)` // Màu xanh lam đến tím lấp lánh
        });
      }
    }

    // Gói 4: Tên Lửa (500 sao) -> Tên lửa bay từ dưới lên giữa màn hình kèm khói lửa
    else if (amount === 500) {
      for (let r = 0; r < 3; r++) {
        const startX = canvas.width * 0.25 + (canvas.width * 0.5 * (r / 2));
        particles.push({
          type: "rocket",
          x: startX,
          y: canvas.height + 40,
          vx: Math.random() * 1 - 0.5,
          vy: -(Math.random() * 3 + 5),
          size: 40,
          life: 1.0,
          decay: 0.007
        });
      }
    }

    // Gói 5: Vương Miện (1000 sao) -> Vương miện rơi từ trên xuống tâm và phát ra xung ánh sáng
    else if (amount === 1000) {
      const cx = canvas.width / 2;
      const cy = canvas.height * 0.4;

      // 1. Tạo vương miện lớn rơi xuống
      particles.push({
        type: "crown",
        x: cx,
        y: -50,
        vx: 0,
        vy: 2.5,
        size: 70,
        gravity: 0, // Không chịu trọng lực
        life: 1.8,
        decay: 0.006
      });

      // 2. Tạo 3 vòng tròn ánh sáng tỏa ra từ tâm sau 1s (giả lập delay bằng tuổi thọ)
      for (let w = 0; w < 3; w++) {
        setTimeout(() => {
          particles.push({
            type: "ring",
            x: cx,
            y: cy,
            vx: 0,
            vy: 0,
            size: 10,
            growthRate: 4 + w * 2,
            life: 1.0,
            decay: 0.015,
            color: "rgba(255, 183, 3, 0.8)"
          });
        }, w * 300);
      }

      // 3. Một cơn mưa sao vàng óng bay lên xung quanh
      for (let s = 0; s < 45; s++) {
        particles.push({
          type: "star",
          x: Math.random() * canvas.width,
          y: canvas.height + 10,
          vx: Math.random() * 2 - 1,
          vy: -(Math.random() * 3 + 2),
          size: Math.random() * 14 + 8,
          life: 1.0,
          decay: 0.008,
          swayWidth: 1.0,
          swayOffset: Math.random() * 50,
          color: "#ffb703" // Vàng kim
        });
      }
    }
  };

  // Vẽ hình sao 5 cánh thô lên Canvas
  const drawStar = (
    ctx: CanvasRenderingContext2D,
    cx: number,
    cy: number,
    spikes: number,
    outerRadius: number,
    innerRadius: number,
    color: string,
    alpha: number
  ) => {
    let rot = (Math.PI / 2) * 3;
    let x = cx;
    let y = cy;
    const step = Math.PI / spikes;

    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.fillStyle = color;
    ctx.shadowBlur = 15;
    ctx.shadowColor = color;
    ctx.beginPath();
    ctx.moveTo(cx, cy - outerRadius);
    for (let i = 0; i < spikes; i++) {
      x = cx + Math.cos(rot) * outerRadius;
      y = cy + Math.sin(rot) * outerRadius;
      ctx.lineTo(x, y);
      rot += step;

      x = cx + Math.cos(rot) * innerRadius;
      y = cy + Math.sin(rot) * innerRadius;
      ctx.lineTo(x, y);
      rot += step;
    }
    ctx.lineTo(cx, cy - outerRadius);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  };

  return <canvas ref={canvasRef} className={styles.animationCanvas || ""} />;
}
