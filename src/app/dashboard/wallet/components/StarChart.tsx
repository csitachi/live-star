"use client";

import React from "react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import styles from "../page.module.css";

interface ChartDataPoint {
  date: string;
  in: number;
  out: number;
}

interface StarChartProps {
  data: ChartDataPoint[];
}

export default function StarChart({ data }: StarChartProps) {
  return (
    <div className={styles.chartCard} style={{ flex: 2 }}>
      <div className={styles.chartTitle}>
        <span>📈</span> Biến động sao (30 ngày gần đây)
      </div>
      <div className={styles.chartContainer}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorIn" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#00dcff" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#00dcff" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorOut" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ff007f" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#ff007f" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
            <XAxis
              dataKey="date"
              stroke="rgba(255,255,255,0.4)"
              fontSize={10}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="rgba(255,255,255,0.4)"
              fontSize={10}
              tickLine={false}
              axisLine={false}
              tickFormatter={(v) => (v >= 1000 ? `${(v / 1000).toFixed(0)}k` : v)}
            />
            <Tooltip
              contentStyle={{
                background: "rgba(22, 22, 34, 0.95)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "12px",
                boxShadow: "0 10px 25px rgba(0,0,0,0.5)",
                color: "#fff",
                fontSize: "0.8rem",
              }}
              labelStyle={{ fontWeight: "bold", marginBottom: "4px", color: "var(--color-accent)" }}
            />
            <Area
              name="Sao nhận (+)"
              type="monotone"
              dataKey="in"
              stroke="#00dcff"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorIn)"
            />
            <Area
              name="Sao chi (-)"
              type="monotone"
              dataKey="out"
              stroke="#ff007f"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorOut)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
