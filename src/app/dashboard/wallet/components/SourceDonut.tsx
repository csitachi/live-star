"use client";

import React from "react";
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from "recharts";
import styles from "../page.module.css";

interface DonutDataPoint {
  type: string;
  label: string;
  value: number;
}

interface SourceDonutProps {
  data: DonutDataPoint[];
}

const COLORS: Record<string, string> = {
  RECHARGE: "#00dcff",
  GIFT_RECEIVED: "#9d4edd",
  QUEST_REWARD: "#f1c40f",
  CHEST_CLAIM: "#2ecc71",
  PREDICTION_WIN: "#1abc9c",
  PREDICTION_REFUND: "#95a5a6",
  DEFAULT: "#ff007f",
};

export default function SourceDonut({ data }: SourceDonutProps) {
  const total = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className={styles.chartCard} style={{ flex: 1 }}>
      <div className={styles.chartTitle}>
        <span>🍩</span> Cơ cấu nguồn sao nhận
      </div>
      
      {data.length === 0 ? (
        <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.85rem", color: "var(--text-muted)" }}>
          Chưa nhận sao nào gần đây
        </div>
      ) : (
        <>
          <div className={styles.chartContainer} style={{ height: "140px" }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  innerRadius={45}
                  outerRadius={60}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {data.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={COLORS[entry.type] || COLORS.DEFAULT} 
                    />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    background: "rgba(22, 22, 34, 0.95)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: "12px",
                    color: "#fff",
                    fontSize: "0.75rem",
                  }}
                  formatter={(value: any) => [`${Number(value).toLocaleString()} sao`, "Số lượng"]}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className={styles.donutLegendList}>
            {data.map((item, index) => {
              const color = COLORS[item.type] || COLORS.DEFAULT;
              const percent = total > 0 ? ((item.value / total) * 100).toFixed(0) : "0";
              return (
                <div key={item.type} className={styles.donutLegendItem}>
                  <div className={styles.donutLegendLabel}>
                    <span 
                      className={styles.donutLegendColor} 
                      style={{ backgroundColor: color }} 
                    />
                    <span>{item.label}</span>
                  </div>
                  <div className={styles.donutLegendValue}>
                    {item.value.toLocaleString()} ({percent}%)
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
