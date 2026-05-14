import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppSidebar } from "@/components/Sidebar";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, MapPin, UploadCloud, AlertCircle } from "lucide-react";
import MapPicker from "@/components/MapPicker";

export default function NovaOcorrencia() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [coords, setCoords] = useState(null);
  const [formData, setFormData] = useState({
    titulo: "",
    categoria: "",
    descricao: "",
  });

  async function handleSubmit(e) {
    e.preventDefault();

    if (!coords) {
      alert("Selecione a localização no mapa clicando no ponto exato do problema.");
      return;
    }

    setLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 800));

    alert("Ocorrência registrada com sucesso!");
    navigate("/ocorrencias");
    setLoading(false);
  }

  return (
    <div style={{ display: "flex", width: "100%", height: "100vh", overflow: "hidden", background: "#f8fafc" }}>
      <AppSidebar />

      <main style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0, overflow: "hidden" }}>
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
          <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => navigate("/ocorrencias")}>
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <h1 style={{ fontSize: "14px", fontWeight: "600", margin: 0 }}>Registrar Ocorrência</h1>
        </header>

        <div style={{ flex: 1, display: "flex", minHeight: 0, overflow: "hidden" }}>
          <div
            style={{ width: "420px", flexShrink: 0, overflowY: "auto", padding: "32px 28px", background: "white", borderRight: ".5px solid #e2e8f0" }}
          >
            <h2 style={{ fontSize: "18px", fontWeight: "700", margin: "0 0 4px", color: "#0f172a" }}>Detalhes do Problema</h2>
            <p style={{ fontSize: "13px", color: "#64748b", margin: "0 0 28px" }}>Seu relato ajuda a prefeitura a priorizar o atendimento.</p>

            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
              <div>
                <label
                  style={{ fontSize: "11px", fontWeight: "700", color: "#64748b", textTransform: "uppercase", display: "block", marginBottom: "6px" }}
                >
                  Título *
                </label>
                <Input
                  placeholder="Ex: Buraco na calçada da Rua X"
                  required
                  value={formData.titulo}
                  onChange={(e) => setFormData({ ...formData, titulo: e.target.value })}
                />
              </div>

              <div>
                <label
                  style={{ fontSize: "11px", fontWeight: "700", color: "#64748b", textTransform: "uppercase", display: "block", marginBottom: "6px" }}
                >
                  Categoria *
                </label>
                <select
                  required
                  style={{
                    width: "100%",
                    height: "40px",
                    borderRadius: "6px",
                    border: "1px solid #e2e8f0",
                    padding: "0 12px",
                    fontSize: "13px",
                    background: "white",
                    cursor: "pointer",
                    outline: "none",
                  }}
                  value={formData.categoria}
                  onChange={(e) => setFormData({ ...formData, categoria: e.target.value })}
                >
                  <option value="" disabled>
                    Selecione uma categoria...
                  </option>
                  <option value="buraco">Buraco na Via</option>
                  <option value="alagamento">Alagamento</option>
                  <option value="iluminacao">Iluminação Pública</option>
                  <option value="arvore">Queda de Árvore</option>
                </select>
              </div>

              <div>
                <label
                  style={{ fontSize: "11px", fontWeight: "700", color: "#64748b", textTransform: "uppercase", display: "block", marginBottom: "6px" }}
                >
                  Descrição *
                </label>
                <Textarea
                  placeholder="Descreva o problema com detalhes..."
                  required
                  style={{ height: "100px", resize: "none" }}
                  value={formData.descricao}
                  onChange={(e) => setFormData({ ...formData, descricao: e.target.value })}
                />
              </div>

              <div>
                <label
                  style={{ fontSize: "11px", fontWeight: "700", color: "#64748b", textTransform: "uppercase", display: "block", marginBottom: "6px" }}
                >
                  Foto (opcional)
                </label>
                <div
                  style={{
                    border: "2px dashed #e2e8f0",
                    borderRadius: "8px",
                    padding: "24px",
                    textAlign: "center",
                    cursor: "pointer",
                    background: "#f8fafc",
                  }}
                >
                  <UploadCloud style={{ width: "24px", height: "24px", color: "#94a3b8", margin: "0 auto 8px" }} />
                  <p style={{ fontSize: "12px", color: "#64748b", margin: 0 }}>Clique para enviar imagem</p>
                </div>
              </div>

              <div
                style={{
                  padding: "10px 14px",
                  borderRadius: "6px",
                  background: coords ? "#eff6ff" : "#fffbeb",
                  border: `1px solid ${coords ? "#bfdbfe" : "#fde68a"}`,
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  fontSize: "12px",
                  fontWeight: "500",
                  color: coords ? "#1d4ed8" : "#b45309",
                }}
              >
                {coords ? (
                  <>
                    <MapPin style={{ width: "14px", height: "14px" }} /> {coords.lat.toFixed(5)}, {coords.lng.toFixed(5)}
                  </>
                ) : (
                  <>
                    <AlertCircle style={{ width: "14px", height: "14px" }} /> Clique no mapa para marcar o local
                  </>
                )}
              </div>

              <Button type="submit" disabled={loading} style={{ height: "44px", fontWeight: "600", fontSize: "14px", marginTop: "8px" }}>
                {loading ? "Enviando..." : "Registrar Ocorrência"}
              </Button>
            </form>
          </div>

          <div style={{ flex: 1, position: "relative", minWidth: 0, minHeight: 0 }}>
            <MapPicker
              selectedLocation={coords}
              onLocationSelect={(novasCoordenadas) => {
                setCoords(novasCoordenadas);
              }}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
