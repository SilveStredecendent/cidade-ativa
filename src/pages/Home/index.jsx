import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { AppSidebar } from "@/components/Sidebar";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, AlertTriangle, Wrench, Droplets, Trees, Plus } from "lucide-react";
import MapView from "@/components/MapView";
import { OccurrenceCard } from "@/components/OccurrenceCard";
import { StatusBadge } from "@/components/StatusBadge";

const CATEGORIAS = [
  { id: "todos", label: "Todos", icon: null },
  { id: "buraco", label: "Buraco", icon: AlertTriangle },
  { id: "alagamento", label: "Alagamento", icon: Droplets },
  { id: "obra", label: "Obra", icon: Wrench },
  { id: "arvore", label: "Árvore", icon: Trees },
];

const OCORRENCIAS_MOCK = [
  {
    id: 1,
    titulo: "Buraco na via principal",
    categoria: "buraco",
    local: "Av. Brasil, 1200",
    status: "ABERTA",
    urgencia: "alta",
    tempo: "2h atrás",
    confirmacoes: 12,
  },
  {
    id: 2,
    titulo: "Alagamento após chuva",
    categoria: "alagamento",
    local: "Rua das Flores, 45",
    status: "EM ATENDIMENTO",
    urgencia: "media",
    tempo: "5h atrás",
    confirmacoes: 8,
  },
  {
    id: 3,
    titulo: "Árvore caída bloqueando rua",
    categoria: "arvore",
    local: "Rua Gomes Costa, 300",
    status: "ABERTA",
    urgencia: "alta",
    tempo: "1h atrás",
    confirmacoes: 21,
  },
  {
    id: 4,
    titulo: "Obra sem sinalização",
    categoria: "obra",
    local: "Av. Independência, 800",
    status: "ABERTA",
    urgencia: "baixa",
    tempo: "3h atrás",
    confirmacoes: 3,
  },
];

const STATUS_COLOR = {
  ABERTA: { bg: "var(--color-background-warning)", text: "var(--color-text-warning)" },
  "EM ATENDIMENTO": { bg: "var(--color-background-info)", text: "var(--color-text-info)" },
  RESOLVIDA: { bg: "var(--color-background-success)", text: "var(--color-text-success)" },
};

const URGENCIA_COLOR = {
  alta: "var(--color-text-danger)",
  media: "var(--color-text-warning)",
  baixa: "var(--color-text-secondary)",
};

export default function Home() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [categoriaAtiva, setCategoriaAtiva] = useState("todos");
  const [ocorrenciaAtiva, setOcorrenciaAtiva] = useState(null);

  const ocorrenciasFiltradas = categoriaAtiva === "todos" ? OCORRENCIAS_MOCK : OCORRENCIAS_MOCK.filter((o) => o.categoria === categoriaAtiva);

  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        height: "100vh",
        overflow: "hidden",
        background: "var(--color-background-tertiary)",
      }}
    >
      {/* Sidebar */}
      <AppSidebar />

      {/* Área principal — flex coluna ocupando o resto */}
      <main
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          minWidth: 0,
          overflow: "hidden",
        }}
      >
        {/* Header */}
        <header
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "12px 20px",
            background: "var(--color-background-primary)",
            borderBottom: ".5px solid var(--color-border-tertiary)",
            flexShrink: 0,
            gap: "12px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <SidebarTrigger />
            <div>
              <h1 style={{ fontSize: "15px", fontWeight: "500", color: "var(--color-text-primary)", margin: 0 }}>Mapa de Ocorrências</h1>
              <p style={{ fontSize: "12px", color: "var(--color-text-tertiary)", margin: 0 }}>Ourinhos — SP</p>
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <div
              style={{
                display: "flex",
                gap: "8px",
                padding: "6px 12px",
                background: "var(--color-background-secondary)",
                borderRadius: "var(--border-radius-md)",
                fontSize: "12px",
              }}
            >
              <span style={{ color: "var(--color-text-danger)", fontWeight: "500" }}>4 Alta</span>
              <span style={{ color: "var(--color-text-tertiary)" }}>·</span>
              <span style={{ color: "var(--color-text-warning)", fontWeight: "500" }}>3 Média</span>
              <span style={{ color: "var(--color-text-tertiary)" }}>·</span>
              <span style={{ color: "var(--color-text-secondary)", fontWeight: "500" }}>5 Baixa</span>
            </div>
            <Button variant="outline" size="sm" onClick={() => navigate("/ocorrencias/nova")} style={{ gap: "6px", fontSize: "13px" }}>
              <Plus style={{ width: "14px", height: "14px" }} />
              Nova ocorrência
            </Button>
          </div>
        </header>

        {/* Filtros */}
        <div
          style={{
            display: "flex",
            gap: "8px",
            padding: "12px 20px",
            background: "var(--color-background-primary)",
            borderBottom: ".5px solid var(--color-border-tertiary)",
            overflowX: "auto",
            flexShrink: 0,
          }}
        >
          {CATEGORIAS.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setCategoriaAtiva(cat.id)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                padding: "6px 14px",
                borderRadius: "999px",
                border: categoriaAtiva === cat.id ? "1.5px solid var(--color-border-info)" : ".5px solid var(--color-border-tertiary)",
                background: categoriaAtiva === cat.id ? "var(--color-background-info)" : "transparent",
                color: categoriaAtiva === cat.id ? "var(--color-text-info)" : "var(--color-text-secondary)",
                fontSize: "13px",
                fontWeight: "500",
                cursor: "pointer",
                whiteSpace: "nowrap",
                transition: "all .15s",
              }}
            >
              {cat.icon && <cat.icon style={{ width: "13px", height: "13px" }} />}
              {cat.label}
            </button>
          ))}
        </div>

        {/* Conteúdo: mapa + feed — ocupa todo espaço restante */}
        <div
          style={{
            flex: 1,
            display: "flex",
            minHeight: 0,
            overflow: "hidden",
          }}
        >
          {/* Mapa */}
          <div
            style={{
              flex: 1,
              position: "relative",
              minWidth: 0,
              minHeight: 0,
            }}
          >
            <MapView
              ocorrencias={ocorrenciasFiltradas.map((oc) => ({
                ...oc,
                latitude: null,
                longitude: null,
              }))}
              onOcorrenciaClick={setOcorrenciaAtiva}
              ocorrenciaAtiva={ocorrenciaAtiva?.id}
            />

            {/* Popup de ocorrência clicada */}
            {ocorrenciaAtiva && (
              <div
                style={{
                  position: "absolute",
                  bottom: "24px",
                  left: "50%",
                  transform: "translateX(-50%)",
                  background: "white" /* <-- A MÁGICA AQUI: Fundo branco sólido! */,
                  border: "1px solid #e2e8f0",
                  borderRadius: "12px",
                  padding: "16px",
                  minWidth: "280px",
                  maxWidth: "320px",
                  boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.15)" /* Sombra para destacar do mapa */,
                  zIndex: 10,
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "8px" }}>
                  <p style={{ fontSize: "14px", fontWeight: "700", color: "#0f172a", margin: 0 }}>{ocorrenciaAtiva.titulo}</p>
                  <button
                    onClick={() => setOcorrenciaAtiva(null)}
                    style={{
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      color: "#94a3b8",
                      fontSize: "20px",
                      padding: "0",
                      lineHeight: "1",
                    }}
                  >
                    ×
                  </button>
                </div>

                <p
                  style={{
                    fontSize: "12px",
                    color: "#64748b",
                    margin: "0 0 12px",
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                  }}
                >
                  <MapPin style={{ width: "14px", height: "14px" }} />
                  {ocorrenciaAtiva.local}
                </p>

                <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                  {/* Já usando nosso componente padronizado de cor! */}
                  <StatusBadge status={ocorrenciaAtiva.status} />

                  <span style={{ fontSize: "11px", color: URGENCIA_COLOR[ocorrenciaAtiva.urgencia], fontWeight: "800", textTransform: "uppercase" }}>
                    Urgência {ocorrenciaAtiva.urgencia}
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Feed lateral */}
          <div
            style={{
              width: "300px",
              flexShrink: 0,
              background: "var(--color-background-primary)",
              borderLeft: ".5px solid var(--color-border-tertiary)",
              display: "flex",
              flexDirection: "column",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                padding: "12px 16px",
                borderBottom: ".5px solid var(--color-border-tertiary)",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexShrink: 0,
              }}
            >
              <p style={{ fontSize: "13px", fontWeight: "500", color: "var(--color-text-primary)", margin: 0 }}>Ocorrências do dia</p>
              <Badge variant="secondary">{ocorrenciasFiltradas.length}</Badge>
            </div>

            {/* Feed lateral */}
            <div style={{ flex: 1, overflowY: "auto", padding: "12px" }}>
              {ocorrenciasFiltradas.map((oc) => (
                <OccurrenceCard key={oc.id} ocorrencia={oc} isActive={ocorrenciaAtiva?.id === oc.id} onClick={setOcorrenciaAtiva} />
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
