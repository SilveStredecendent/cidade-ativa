import { AppSidebar } from "@/components/Sidebar";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { CheckCircle2, MessageSquare, AlertTriangle, Trash2 } from "lucide-react";

const NOTIFICACOES_MOCK = [
  { id: 1, tipo: "status", titulo: "Ocorrência Resolvida", msg: "O buraco na Rua São Paulo foi tapado!", data: "10min atrás", lida: false },
  { id: 2, tipo: "comentario", titulo: "Novo Comentário", msg: "Um técnico respondeu ao seu chamado.", data: "1h atrás", lida: false },
  { id: 3, tipo: "alerta", titulo: "Alerta de Chuva", msg: "Previsão de alagamento em Ourinhos.", data: "5h atrás", lida: true },
];

export default function NotificacoesPage() {
  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        height: "100vh",
        overflow: "hidden",
        background: "#f8fafc",
      }}
    >
      <AppSidebar />

      <main
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          minWidth: 0,
          overflow: "hidden",
        }}
      >
        <header
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            padding: "0 24px",
            height: "56px",
            background: "white",
            borderBottom: ".5px solid #e2e8f0",
            flexShrink: 0,
          }}
        >
          <SidebarTrigger />
          <Separator orientation="vertical" className="h-4" />
          <h1 style={{ fontSize: "14px", fontWeight: "600", margin: 0, color: "#0f172a" }}>Notificações</h1>
          <div style={{ marginLeft: "auto" }}>
            <Button variant="ghost" size="sm" style={{ fontSize: "12px", color: "#3b82f6", fontWeight: "600" }}>
              Marcar todas como lidas
            </Button>
          </div>
        </header>

        <div style={{ flex: 1, overflowY: "auto", padding: "24px" }}>
          <div style={{ maxWidth: "720px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "12px" }}>
            {NOTIFICACOES_MOCK.map((n) => (
              <div
                key={n.id}
                style={{
                  display: "flex",
                  gap: "16px",
                  padding: "16px",
                  background: "white",
                  borderRadius: "12px",
                  border: n.lida ? ".5px solid #e2e8f0" : ".5px solid #bfdbfe",
                  borderLeft: n.lida ? ".5px solid #e2e8f0" : "4px solid #3b82f6",
                  opacity: n.lida ? 0.6 : 1,
                  transition: "all .15s",
                  boxShadow: n.lida ? "none" : "0 1px 2px rgba(0,0,0,0.05)",
                }}
              >
                <div
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    background: n.tipo === "status" ? "#f0fdf4" : n.tipo === "comentario" ? "#eff6ff" : "#fff7ed",
                    color: n.tipo === "status" ? "#16a34a" : n.tipo === "comentario" ? "#2563eb" : "#ea580c",
                  }}
                >
                  {n.tipo === "status" && <CheckCircle2 style={{ width: "20px", height: "20px" }} />}
                  {n.tipo === "comentario" && <MessageSquare style={{ width: "20px", height: "20px" }} />}
                  {n.tipo === "alerta" && <AlertTriangle style={{ width: "20px", height: "20px" }} />}
                </div>

                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "4px" }}>
                    <p style={{ fontSize: "13px", fontWeight: "600", color: "#0f172a", margin: 0 }}>{n.titulo}</p>
                    <span style={{ fontSize: "11px", color: "#94a3b8", flexShrink: 0, marginLeft: "12px" }}>{n.data}</span>
                  </div>
                  <p style={{ fontSize: "12px", color: "#64748b", margin: 0, lineHeight: "1.5" }}>{n.msg}</p>
                </div>

                <button
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    color: "#cbd5e1",
                    padding: "6px",
                    borderRadius: "6px",
                    display: "flex",
                    alignItems: "center",
                    flexShrink: 0,
                    transition: "color .15s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#ef4444")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "#cbd5e1")}
                >
                  <Trash2 style={{ width: "16px", height: "16px" }} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
