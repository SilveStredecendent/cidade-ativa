import React from "react";
import { MapPin } from "lucide-react";
import { StatusBadge } from "./StatusBadge";

const URGENCIA_COLOR = {
  alta: "#ef4444",
  media: "#f59e0b",
  baixa: "#64748b",
};

export function OccurrenceCard({ ocorrencia, onClick, isActive }) {
  if (!ocorrencia) return null;

  return (
    <button
      onClick={() => onClick && onClick(ocorrencia)}
      style={{
        display: "block",
        width: "100%",
        textAlign: "left",
        background: isActive ? "#f8fafc" : "white",
        border: isActive ? "1px solid #cbd5e1" : "1px solid #e2e8f0",
        borderRadius: "10px",
        padding: "14px",
        cursor: "pointer",
        marginBottom: "10px",
        transition: "all 0.15s ease",
      }}
      onMouseEnter={(e) => {
        if (!isActive) e.currentTarget.style.borderColor = "#cbd5e1";
      }}
      onMouseLeave={(e) => {
        if (!isActive) e.currentTarget.style.borderColor = "#e2e8f0";
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px", alignItems: "flex-start" }}>
        <p style={{ fontSize: "13px", fontWeight: "600", color: "#0f172a", margin: 0, lineHeight: "1.3" }}>{ocorrencia.titulo}</p>
        <span
          style={{
            fontSize: "10px",
            fontWeight: "800",
            color: URGENCIA_COLOR[ocorrencia.urgencia] || URGENCIA_COLOR.baixa,
            textTransform: "uppercase",
            flexShrink: 0,
            marginLeft: "12px",
          }}
        >
          {ocorrencia.urgencia}
        </span>
      </div>

      <p style={{ fontSize: "12px", color: "#64748b", margin: "0 0 12px", display: "flex", alignItems: "center", gap: "6px" }}>
        <MapPin style={{ width: "13px", height: "13px", flexShrink: 0 }} />
        <span style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{ocorrencia.local}</span>
      </p>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <StatusBadge status={ocorrencia.status} />

        <span style={{ fontSize: "10px", color: "#94a3b8", fontWeight: "500" }}>{ocorrencia.tempo || ocorrencia.data}</span>
      </div>
    </button>
  );
}
