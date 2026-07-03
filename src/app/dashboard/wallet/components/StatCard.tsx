import React from "react";
import styles from "../page.module.css";

interface StatCardProps {
  title: string;
  value: number;
  icon: string;
  colorType: "primary" | "success" | "danger" | "warning";
}

export default function StatCard({ title, value, icon, colorType }: StatCardProps) {
  const cardClass = `${styles.statCard} ${
    colorType === "primary"
      ? styles.cardPrimary
      : colorType === "success"
      ? styles.cardSuccess
      : colorType === "danger"
      ? styles.cardDanger
      : styles.cardWarning
  }`;

  return (
    <div className={cardClass}>
      <div className={styles.statCardHeader}>
        <span>{title}</span>
        <span className={styles.statIcon}>{icon}</span>
      </div>
      <div className={styles.statValue}>
        <span>{value.toLocaleString()}</span>
        <span style={{ fontSize: "1.1rem", opacity: 0.8 }}>⭐</span>
      </div>
    </div>
  );
}
