import React from "react";

const STATUS_CONFIG = {
  ABERTA: { bg: "#ffedd5", text: "#c2410c", label: "Aberta" }, // Laranja
  "EM ATENDIMENTO": { bg: "#dbeafe", text: "#1d4ed8", label: "Em Atendimento" }, // Azul
  RESOLVIDA: { bg: "#dcfce3", text: "#15803d", label: "Resolvida" }, // Verde
};

export function StatusBadge({ status }) {
  const config = STATUS_CONFIG[status] || { bg: "#f1f5f9", text: "#475569", label: status };

  return (
    <span
      style={{
        display: "inline-block",
        backgroundColor: config.bg,
        color: config.text,
        padding: "4px 10px",
        borderRadius: "999px",
        fontSize: "10px",
        fontWeight: "800",
        textTransform: "uppercase",
        letterSpacing: "0.05em",
        whiteSpace: "nowrap",
      }}
    >
      {config.label}
    </span>
  );
}
