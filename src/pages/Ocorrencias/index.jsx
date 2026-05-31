import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AppSidebar } from "@/components/Sidebar";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, Plus, Eye, Trash2 } from "lucide-react";
import { StatusBadge } from "@/components/StatusBadge";

const STORAGE_KEY = "@cidadeativa:ocorrencias";

// Mocks fixos (simulam ocorrências já existentes no sistema)
const OCORRENCIAS_MOCK = [
  { id: "2026-001", titulo: "Buraco na via principal", categoria: "Buraco na Via", data: "24/10/2026", status: "ABERTA", urgencia: "alta" },
  { id: "2026-002", titulo: "Alagamento após chuva", categoria: "Alagamento", data: "20/10/2026", status: "EM ATENDIMENTO", urgencia: "media" },
  { id: "2026-003", titulo: "Lâmpada queimada", categoria: "Iluminação Pública", data: "15/09/2026", status: "RESOLVIDA", urgencia: "baixa" },
];

// Mapa de categoria (slug → label legível)
const CATEGORIA_LABEL = {
  buraco: "Buraco na Via",
  alagamento: "Alagamento",
  iluminacao: "Iluminação Pública",
  arvore: "Queda de Árvore",
  obra: "Obra",
};

function lerDoStorage() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  } catch {
    return [];
  }
}

export default function OcorrenciasPage() {
  const navigate = useNavigate();
  const [busca, setBusca] = useState("");
  const [filtroStatus, setFiltroStatus] = useState("todos");
  const [ocorrenciasLocais, setOcorrenciasLocais] = useState(lerDoStorage);

  // Sincroniza com localStorage quando outras páginas salvam dados
  useEffect(() => {
    function onStorage() {
      setOcorrenciasLocais(lerDoStorage());
    }
    window.addEventListener("storage", onStorage);
    setOcorrenciasLocais(lerDoStorage());
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  // Transforma ocorrências locais para o formato da tabela
  const locaisFormatadas = ocorrenciasLocais.map((oc) => ({
    id: oc.id,
    titulo: oc.titulo,
    categoria: CATEGORIA_LABEL[oc.categoria] || oc.categoria,
    data: oc.data || new Date(oc.criadoEm).toLocaleDateString("pt-BR"),
    status: oc.status,
    urgencia: oc.urgencia,
    isLocal: true,
  }));

  // Mescla: locais primeiro (mais recentes), depois os mocks
  const todasOcorrencias = [...locaisFormatadas, ...OCORRENCIAS_MOCK];

  const filtradas = todasOcorrencias.filter((oc) => {
    const buscaOk = oc.titulo.toLowerCase().includes(busca.toLowerCase()) || String(oc.id).includes(busca);
    const statusOk =
      filtroStatus === "todos" ||
      (filtroStatus === "abertas" && oc.status === "ABERTA") ||
      (filtroStatus === "em_atendimento" && oc.status === "EM ATENDIMENTO") ||
      (filtroStatus === "resolvidas" && oc.status === "RESOLVIDA");
    return buscaOk && statusOk;
  });

  function excluirLocal(id) {
    const novaLista = ocorrenciasLocais.filter((oc) => oc.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(novaLista));
    setOcorrenciasLocais(novaLista);
    window.dispatchEvent(new Event("storage"));
  }

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

        <div style={{ flex: 1, overflowY: "auto", padding: "24px" }}>
          <div style={{ maxWidth: "960px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "16px" }}>

            {/* Barra de filtros */}
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
                  ["em_atendimento", "Em atendimento"],
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

            {/* Contadores rápidos */}
            <div style={{ display: "flex", gap: "12px" }}>
              {[
                { label: "Total", valor: todasOcorrencias.length, cor: "#0f172a" },
                { label: "Abertas", valor: todasOcorrencias.filter((o) => o.status === "ABERTA").length, cor: "#d97706" },
                { label: "Em atendimento", valor: todasOcorrencias.filter((o) => o.status === "EM ATENDIMENTO").length, cor: "#2563eb" },
                { label: "Resolvidas", valor: todasOcorrencias.filter((o) => o.status === "RESOLVIDA").length, cor: "#16a34a" },
              ].map(({ label, valor, cor }) => (
                <div
                  key={label}
                  style={{
                    background: "white",
                    border: ".5px solid #e2e8f0",
                    borderRadius: "10px",
                    padding: "10px 16px",
                    flex: 1,
                    textAlign: "center",
                  }}
                >
                  <p style={{ fontSize: "22px", fontWeight: "700", color: cor, margin: 0 }}>{valor}</p>
                  <p style={{ fontSize: "11px", color: "#64748b", margin: 0 }}>{label}</p>
                </div>
              ))}
            </div>

            {/* Tabela */}
            <div style={{ background: "white", borderRadius: "12px", border: ".5px solid #e2e8f0", overflow: "hidden" }}>
              <Table>
                <TableHeader className="bg-slate-50/80">
                  <TableRow>
                    <TableHead className="w-[140px]">Protocolo</TableHead>
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
                      <TableCell className="font-mono text-xs text-slate-500">
                        {oc.isLocal ? (
                          <span style={{ display: "inline-flex", alignItems: "center", gap: "4px" }}>
                            <span
                              style={{
                                width: "6px",
                                height: "6px",
                                borderRadius: "50%",
                                background: "#3b82f6",
                                display: "inline-block",
                                flexShrink: 0,
                              }}
                            />
                            Local
                          </span>
                        ) : (
                          `#${oc.id}`
                        )}
                      </TableCell>
                      <TableCell className="font-medium text-slate-900">{oc.titulo}</TableCell>
                      <TableCell className="text-slate-500">{oc.categoria}</TableCell>
                      <TableCell className="text-slate-500">{oc.data}</TableCell>
                      <TableCell>
                        <StatusBadge status={oc.status} />
                      </TableCell>
                      <TableCell className="text-right">
                        <div style={{ display: "flex", justifyContent: "flex-end", gap: "4px" }}>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-slate-400 hover:text-blue-600">
                            <Eye className="w-4 h-4" />
                          </Button>
                          {oc.isLocal && (
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0 text-slate-400 hover:text-red-500"
                              onClick={() => excluirLocal(oc.id)}
                              title="Remover ocorrência local"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          )}
                        </div>
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
