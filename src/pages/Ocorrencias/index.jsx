import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppSidebar } from "@/components/Sidebar";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, Plus, Eye } from "lucide-react";
import { StatusBadge } from "@/components/StatusBadge";

// Mock de dados com categorias e status padronizados
const MINHAS_OCORRENCIAS = [
  { id: "2026-001", titulo: "Buraco na via principal", categoria: "Buraco", data: "24/10/2026", status: "ABERTA", urgencia: "alta" },
  { id: "2026-002", titulo: "Alagamento após chuva", categoria: "Alagamento", data: "20/10/2026", status: "EM ATENDIMENTO", urgencia: "media" },
  { id: "2026-003", titulo: "Lâmpada queimada", categoria: "Iluminação", data: "15/09/2026", status: "RESOLVIDA", urgencia: "baixa" },
];

const STATUS_STYLE = {
  ABERTA: "bg-orange-100 text-orange-700",
  "EM ATENDIMENTO": "bg-blue-100 text-blue-700",
  RESOLVIDA: "bg-green-100 text-green-700",
};

export default function OcorrenciasPage() {
  const navigate = useNavigate();
  const [busca, setBusca] = useState("");
  const [filtroStatus, setFiltroStatus] = useState("todos");

  // Lógica de filtro combinada (Busca por texto + Botões de Status)
  const filtradas = MINHAS_OCORRENCIAS.filter((oc) => {
    const buscaOk = oc.titulo.toLowerCase().includes(busca.toLowerCase()) || oc.id.includes(busca);
    const statusOk =
      filtroStatus === "todos" ||
      (filtroStatus === "abertas" && oc.status === "ABERTA") ||
      (filtroStatus === "resolvidas" && oc.status === "RESOLVIDA");
    return buscaOk && statusOk;
  });

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
      {/* Sidebar importada manualmente para garantir o layout */}
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
        {/* Header Fixo */}
        <header
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 24px",
            height: "56px",
            background: "white",
            borderBottom: ".5px solid #e2e8f0",
            flexShrink: 0,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <SidebarTrigger />
            <Separator orientation="vertical" className="h-4" />
            <h1 style={{ fontSize: "14px", fontWeight: "600", margin: 0 }}>Minhas Ocorrências</h1>
          </div>
          <Button size="sm" onClick={() => navigate("/ocorrencias/nova")} className="gap-2 h-8 text-xs">
            <Plus className="w-3.5 h-3.5" /> Nova ocorrência
          </Button>
        </header>

        {/* Área de Rolagem do Conteúdo */}
        <div style={{ flex: 1, overflowY: "auto", padding: "24px" }}>
          <div style={{ maxWidth: "900px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "16px" }}>
            {/* Barra de Busca e Filtros */}
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "12px",
                alignItems: "center",
                justifyContent: "space-between",
                background: "white",
                padding: "12px 16px",
                borderRadius: "12px",
                border: ".5px solid #e2e8f0",
              }}
            >
              <div style={{ position: "relative", flex: 1, minWidth: "200px", maxWidth: "360px" }}>
                <Search
                  style={{
                    position: "absolute",
                    left: "10px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    width: "14px",
                    height: "14px",
                    color: "#94a3b8",
                  }}
                />
                <Input
                  placeholder="Buscar por protocolo ou título..."
                  style={{ paddingLeft: "32px", height: "36px", fontSize: "13px" }}
                  value={busca}
                  onChange={(e) => setBusca(e.target.value)}
                />
              </div>

              <div style={{ display: "flex", gap: "6px" }}>
                {[
                  ["todos", "Todos"],
                  ["abertas", "Abertas"],
                  ["resolvidas", "Resolvidas"],
                ].map(([val, label]) => (
                  <button
                    key={val}
                    onClick={() => setFiltroStatus(val)}
                    style={{
                      padding: "4px 12px",
                      borderRadius: "999px",
                      fontSize: "12px",
                      fontWeight: "500",
                      cursor: "pointer",
                      transition: "all .15s",
                      border: filtroStatus === val ? "1.5px solid #3b82f6" : ".5px solid #e2e8f0",
                      background: filtroStatus === val ? "#eff6ff" : "transparent",
                      color: filtroStatus === val ? "#2563eb" : "#64748b",
                    }}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            {/* Tabela de Ocorrências */}
            <div style={{ background: "white", borderRadius: "12px", border: ".5px solid #e2e8f0", overflow: "hidden" }}>
              <Table>
                <TableHeader className="bg-slate-50/80">
                  <TableRow>
                    <TableHead className="w-[120px]">Protocolo</TableHead>
                    <TableHead>Título</TableHead>
                    <TableHead>Categoria</TableHead>
                    <TableHead>Data</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filtradas.map((oc) => (
                    <TableRow key={oc.id}>
                      <TableCell className="font-mono text-xs text-slate-500">#{oc.id}</TableCell>
                      <TableCell className="font-medium text-slate-900">{oc.titulo}</TableCell>
                      <TableCell className="text-slate-500">{oc.categoria}</TableCell>
                      <TableCell className="text-slate-500">{oc.data}</TableCell>
                      <TableCell>
                        <StatusBadge status={oc.status} />
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-slate-400 hover:text-blue-600">
                          <Eye className="w-4 h-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                  {filtradas.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={6} className="h-24 text-center text-slate-400 text-sm">
                        Nenhuma ocorrência encontrada.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
