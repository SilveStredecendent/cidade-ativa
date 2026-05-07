import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "@/hooks/useAuth"
import { AppSidebar } from "@/components/Sidebar"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  MapPin, AlertTriangle, Wrench, Droplets,
  Trees, Plus, Filter, Bell,
} from "lucide-react"

// Dados mock para visualização — serão substituídos pelo ocorrencia.service.js
const CATEGORIAS = [
  { id: "todos",     label: "Todos",     icon: null },
  { id: "buraco",    label: "Buraco",    icon: AlertTriangle },
  { id: "alagamento",label: "Alagamento",icon: Droplets },
  { id: "obra",      label: "Obra",      icon: Wrench },
  { id: "arvore",    label: "Árvore",    icon: Trees },
]

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
]

const STATUS_COLOR = {
  "ABERTA":         { bg: "var(--color-background-warning)", text: "var(--color-text-warning)" },
  "EM ATENDIMENTO": { bg: "var(--color-background-info)",    text: "var(--color-text-info)" },
  "RESOLVIDA":      { bg: "var(--color-background-success)", text: "var(--color-text-success)" },
}

const URGENCIA_COLOR = {
  alta:  "var(--color-text-danger)",
  media: "var(--color-text-warning)",
  baixa: "var(--color-text-secondary)",
}

export default function Home() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [categoriaAtiva, setCategoriaAtiva] = useState("todos")
  const [ocorrenciaAtiva, setOcorrenciaAtiva] = useState(null)

  const ocorrenciasFiltradas = categoriaAtiva === "todos"
    ? OCORRENCIAS_MOCK
    : OCORRENCIAS_MOCK.filter(o => o.categoria === categoriaAtiva)

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "var(--color-background-tertiary)" }}>

      {/* Sidebar */}
      <AppSidebar />

      {/* Área principal */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>

        {/* Header */}
        <header style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "12px 20px",
          background: "var(--color-background-primary)",
          borderBottom: ".5px solid var(--color-border-tertiary)",
          gap: "12px",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <SidebarTrigger />
            <div>
              <h1 style={{ fontSize: "15px", fontWeight: "500", color: "var(--color-text-primary)", margin: 0 }}>
                Mapa de Ocorrências
              </h1>
              <p style={{ fontSize: "12px", color: "var(--color-text-tertiary)", margin: 0 }}>
                Ourinhos — SP
              </p>
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            {/* Contadores rápidos */}
            <div style={{
              display: "flex", gap: "8px",
              padding: "6px 12px",
              background: "var(--color-background-secondary)",
              borderRadius: "var(--border-radius-md)",
              fontSize: "12px",
            }}>
              <span style={{ color: "var(--color-text-danger)", fontWeight: "500" }}>
                4 Alta
              </span>
              <span style={{ color: "var(--color-text-tertiary)" }}>·</span>
              <span style={{ color: "var(--color-text-warning)", fontWeight: "500" }}>
                3 Média
              </span>
              <span style={{ color: "var(--color-text-tertiary)" }}>·</span>
              <span style={{ color: "var(--color-text-secondary)", fontWeight: "500" }}>
                5 Baixa
              </span>
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate("/ocorrencias/nova")}
              style={{ gap: "6px", fontSize: "13px" }}
            >
              <Plus style={{ width: "14px", height: "14px" }} />
              Nova ocorrência
            </Button>
          </div>
        </header>

        {/* Filtros de categoria */}
        <div style={{
          display: "flex", gap: "8px",
          padding: "12px 20px",
          background: "var(--color-background-primary)",
          borderBottom: ".5px solid var(--color-border-tertiary)",
          overflowX: "auto",
        }}>
          {CATEGORIAS.map(cat => (
            <button
              key={cat.id}
              onClick={() => setCategoriaAtiva(cat.id)}
              style={{
                display: "flex", alignItems: "center", gap: "6px",
                padding: "6px 14px",
                borderRadius: "999px",
                border: categoriaAtiva === cat.id
                  ? "1.5px solid var(--color-border-info)"
                  : ".5px solid var(--color-border-tertiary)",
                background: categoriaAtiva === cat.id
                  ? "var(--color-background-info)"
                  : "transparent",
                color: categoriaAtiva === cat.id
                  ? "var(--color-text-info)"
                  : "var(--color-text-secondary)",
                fontSize: "13px", fontWeight: "500",
                cursor: "pointer", whiteSpace: "nowrap",
                transition: "all .15s",
              }}
            >
              {cat.icon && <cat.icon style={{ width: "13px", height: "13px" }} />}
              {cat.label}
            </button>
          ))}
        </div>

        {/* Conteúdo — mapa + feed */}
        <div style={{ flex: 1, display: "flex", overflow: "hidden" }}>

          {/* Mapa — placeholder até integrar Google Maps */}
          <div style={{
            flex: 1,
            background: "#e8e0d0",
            position: "relative",
            display: "flex", alignItems: "center", justifyContent: "center",
            minHeight: "400px",
          }}>
            {/* Grid simulando ruas */}
            <svg width="100%" height="100%" style={{ position: "absolute", inset: 0 }}>
              {/* Linhas horizontais */}
              {[20, 35, 50, 65, 80].map(p => (
                <line key={p} x1="0" y1={`${p}%`} x2="100%" y2={`${p}%`}
                  stroke="#c8bfaa" strokeWidth="2" />
              ))}
              {/* Linhas verticais */}
              {[15, 30, 45, 60, 75, 90].map(p => (
                <line key={p} x1={`${p}%`} y1="0" x2={`${p}%`} y2="100%"
                  stroke="#c8bfaa" strokeWidth="2" />
              ))}
              {/* Blocos de quadra */}
              {[[20,20,25,20],[45,35,20,25],[65,55,25,20],[25,55,20,20]].map(([x,y,w,h],i) => (
                <rect key={i} x={`${x}%`} y={`${y}%`} width={`${w}%`} height={`${h}%`}
                  fill="#d4cabb" rx="2" />
              ))}
              {/* Pins de ocorrências mock */}
              {ocorrenciasFiltradas.map((oc, i) => {
                const positions = [[40,45],[55,30],[70,60],[35,65]]
                const [px, py] = positions[i % positions.length]
                const cor = oc.urgencia === "alta"
                  ? "#E24B4A" : oc.urgencia === "media"
                  ? "#BA7517" : "#888780"
                return (
                  <g key={oc.id} style={{ cursor: "pointer" }}
                    onClick={() => setOcorrenciaAtiva(oc)}>
                    <circle cx={`${px}%`} cy={`${py}%`} r="14"
                      fill={cor} opacity=".2" />
                    <circle cx={`${px}%`} cy={`${py}%`} r="8"
                      fill={cor} />
                    <text x={`${px}%`} y={`${py}%`}
                      textAnchor="middle" dominantBaseline="central"
                      fontSize="10" fill="white" fontWeight="700">
                      {i+1}
                    </text>
                  </g>
                )
              })}
            </svg>

            {/* Label do mapa */}
            <div style={{
              position: "absolute", top: "12px", left: "12px",
              background: "rgba(255,255,255,0.9)",
              borderRadius: "var(--border-radius-md)",
              padding: "6px 10px",
              fontSize: "12px", color: "var(--color-text-secondary)",
              border: ".5px solid var(--color-border-tertiary)",
            }}>
              Google Maps será integrado aqui
            </div>

            {/* Popup de ocorrência clicada */}
            {ocorrenciaAtiva && (
              <div style={{
                position: "absolute", bottom: "16px", left: "50%",
                transform: "translateX(-50%)",
                background: "var(--color-background-primary)",
                border: ".5px solid var(--color-border-tertiary)",
                borderRadius: "var(--border-radius-lg)",
                padding: "12px 16px",
                minWidth: "260px", maxWidth: "320px",
                boxShadow: "0 4px 20px rgba(0,0,0,0.12)",
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <p style={{ fontSize: "14px", fontWeight: "500", color: "var(--color-text-primary)", margin: "0 0 4px" }}>
                    {ocorrenciaAtiva.titulo}
                  </p>
                  <button onClick={() => setOcorrenciaAtiva(null)}
                    style={{ background: "none", border: "none", cursor: "pointer",
                      color: "var(--color-text-tertiary)", fontSize: "16px", padding: 0 }}>
                    ×
                  </button>
                </div>
                <p style={{ fontSize: "12px", color: "var(--color-text-secondary)", margin: "0 0 8px", display: "flex", alignItems: "center", gap: "4px" }}>
                  <MapPin style={{ width: "11px", height: "11px" }} />
                  {ocorrenciaAtiva.local}
                </p>
                <div style={{ display: "flex", gap: "6px", alignItems: "center" }}>
                  <span style={{
                    fontSize: "11px", fontWeight: "500", padding: "2px 8px",
                    borderRadius: "999px",
                    background: STATUS_COLOR[ocorrenciaAtiva.status]?.bg,
                    color: STATUS_COLOR[ocorrenciaAtiva.status]?.text,
                  }}>
                    {ocorrenciaAtiva.status}
                  </span>
                  <span style={{ fontSize: "11px", color: URGENCIA_COLOR[ocorrenciaAtiva.urgencia], fontWeight: "500" }}>
                    Urgência {ocorrenciaAtiva.urgencia}
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Feed lateral */}
          <div style={{
            width: "300px", flexShrink: 0,
            background: "var(--color-background-primary)",
            borderLeft: ".5px solid var(--color-border-tertiary)",
            display: "flex", flexDirection: "column",
            overflow: "hidden",
          }}>
            <div style={{
              padding: "12px 16px",
              borderBottom: ".5px solid var(--color-border-tertiary)",
              display: "flex", justifyContent: "space-between", alignItems: "center",
            }}>
              <p style={{ fontSize: "13px", fontWeight: "500", color: "var(--color-text-primary)", margin: 0 }}>
                Ocorrências do dia
              </p>
              <Badge variant="secondary">
                {ocorrenciasFiltradas.length}
              </Badge>
            </div>

            <div style={{ flex: 1, overflowY: "auto", padding: "8px" }}>
              {ocorrenciasFiltradas.map(oc => (
                <button
                  key={oc.id}
                  onClick={() => setOcorrenciaAtiva(oc)}
                  style={{
                    display: "block", width: "100%", textAlign: "left",
                    background: ocorrenciaAtiva?.id === oc.id
                      ? "var(--color-background-secondary)"
                      : "transparent",
                    border: ".5px solid " + (ocorrenciaAtiva?.id === oc.id
                      ? "var(--color-border-secondary)"
                      : "transparent"),
                    borderRadius: "var(--border-radius-md)",
                    padding: "10px 12px", cursor: "pointer",
                    marginBottom: "4px", transition: "all .15s",
                  }}
                  onMouseEnter={e => {
                    if (ocorrenciaAtiva?.id !== oc.id)
                      e.currentTarget.style.background = "var(--color-background-secondary)"
                  }}
                  onMouseLeave={e => {
                    if (ocorrenciaAtiva?.id !== oc.id)
                      e.currentTarget.style.background = "transparent"
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
                    <p style={{ fontSize: "13px", fontWeight: "500", color: "var(--color-text-primary)", margin: 0 }}>
                      {oc.titulo}
                    </p>
                    <span style={{
                      fontSize: "11px", fontWeight: "700",
                      color: URGENCIA_COLOR[oc.urgencia],
                      textTransform: "uppercase", flexShrink: 0, marginLeft: "4px",
                    }}>
                      {oc.urgencia}
                    </span>
                  </div>

                  <p style={{ fontSize: "12px", color: "var(--color-text-secondary)", margin: "0 0 6px", display: "flex", alignItems: "center", gap: "4px" }}>
                    <MapPin style={{ width: "11px", height: "11px" }} />
                    {oc.local}
                  </p>

                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{
                      fontSize: "11px", fontWeight: "500", padding: "2px 6px",
                      borderRadius: "999px",
                      background: STATUS_COLOR[oc.status]?.bg,
                      color: STATUS_COLOR[oc.status]?.text,
                    }}>
                      {oc.status}
                    </span>
                    <span style={{ fontSize: "11px", color: "var(--color-text-tertiary)" }}>
                      {oc.confirmacoes} confirmações · {oc.tempo}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
