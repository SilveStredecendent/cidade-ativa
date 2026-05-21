import { MapPin } from "lucide-react";
import { StatusBadge } from "@/components/StatusBadge";

const URGENCIA_COLOR = {
  alta: "#ef4444",
  media: "#f59e0b",
  baixa: "#94a3b8",
};

const URGENCIA_BG = {
  alta: "#fef2f2",
  media: "#fffbeb",
  baixa: "#f8fafc",
};

export function OccurrenceCard({ ocorrencia, isActive, onClick }) {
  const oc = ocorrencia;

  return (
    <button
      onClick={() => onClick(oc)}
      style={{
        display: "block",
        width: "100%",
        textAlign: "left",
        background: isActive ? "#f0f9ff" : "transparent",
        border: isActive ? "1.5px solid #bae6fd" : ".5px solid transparent",
        borderRadius: "10px",
        padding: "10px 12px",
        cursor: "pointer",
        marginBottom: "6px",
        transition: "all .15s",
      }}
      onMouseEnter={(e) => {
        if (!isActive) e.currentTarget.style.background = "#f8fafc";
      }}
      onMouseLeave={(e) => {
        if (!isActive) e.currentTarget.style.background = "transparent";
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "5px" }}>
        <p
          style={{
            fontSize: "13px",
            fontWeight: "600",
            color: "#0f172a",
            margin: 0,
            flex: 1,
            marginRight: "8px",
            lineHeight: "1.3",
          }}
        >
          {oc.titulo}
        </p>
        <span
          style={{
            fontSize: "10px",
            fontWeight: "800",
            color: URGENCIA_COLOR[oc.urgencia],
            background: URGENCIA_BG[oc.urgencia],
            padding: "2px 7px",
            borderRadius: "999px",
            textTransform: "uppercase",
            flexShrink: 0,
            letterSpacing: "0.04em",
          }}
        >
          {oc.urgencia}
        </span>
      </div>

      <p
        style={{
          fontSize: "12px",
          color: "#64748b",
          margin: "0 0 7px",
          display: "flex",
          alignItems: "center",
          gap: "4px",
        }}
      >
        <MapPin style={{ width: "11px", height: "11px", flexShrink: 0 }} />
        <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{oc.local}</span>
      </p>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <StatusBadge status={oc.status} />
        <span style={{ fontSize: "11px", color: "#94a3b8" }}>
          {oc.confirmacoes} confirmações · {oc.tempo}
        </span>
      </div>
    </button>
  );
}
