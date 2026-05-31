import { useState } from "react";
import { AppSidebar } from "@/components/Sidebar";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Building2, Users, ShieldCheck, Pencil, Trash2, Plus } from "lucide-react";

const CAMPOS = {
  secretarias: [
    { name: "nome", label: "Nome da Secretaria" },
    { name: "responsavel", label: "Responsável" },
  ],
  equipes: [
    { name: "nome", label: "Nome da Equipe" },
    { name: "secretaria", label: "Secretaria" },
  ],
  colaboradores: [
    { name: "nome", label: "Nome" },
    { name: "email", label: "E-mail" },
    { name: "perfil", label: "Perfil" },
  ],
};

const TITULO_CARD = {
  secretarias: "Secretarias",
  equipes: "Equipes",
  colaboradores: "Colaboradores",
};

const TITULO_DIALOG = {
  secretarias: "Nova Secretaria",
  equipes: "Nova Equipe",
  colaboradores: "Novo Colaborador",
};

const TITULO_DIALOG_EDITAR = {
  secretarias: "Editar Secretaria",
  equipes: "Editar Equipe",
  colaboradores: "Editar Colaborador",
};

const STORAGE_KEY = "@cidadeativa:admin";

function lerDoStorage() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{"secretarias":[],"equipes":[],"colaboradores":[]}');
  } catch {
    return { secretarias: [], equipes: [], colaboradores: [] };
  }
}

export default function Admin() {
  const [abaAtiva, setAbaAtiva] = useState("secretarias");
  const [dialogAberto, setDialogAberto] = useState(false);
  const [form, setForm] = useState({});
  const [editandoId, setEditandoId] = useState(null);
  const [erros, setErros] = useState({});
  const [registros, setRegistros] = useState(lerDoStorage);

  function salvar(novosDados) {
    setRegistros(novosDados);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(novosDados));
  }

  function abrirDialog(item = null) {
    setForm(item ?? {});
    setEditandoId(item?.id ?? null);
    setErros({});
    setDialogAberto(true);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (abaAtiva === "colaboradores" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email ?? "")) {
      setErros({ email: "Insira um e-mail válido." });
      return;
    }
    if (abaAtiva === "equipes" && !form.secretaria) {
      setErros({ secretaria: "Selecione uma secretaria." });
      return;
    }
    setErros({});
    const novosDados = {
      ...registros,
      [abaAtiva]: editandoId
        ? registros[abaAtiva].map((r) => (r.id === editandoId ? { ...form, id: editandoId } : r))
        : [...registros[abaAtiva], { ...form, id: Date.now() }],
    };
    salvar(novosDados);
    setDialogAberto(false);
  }

  function excluir(id) {
    salvar({ ...registros, [abaAtiva]: registros[abaAtiva].filter((r) => r.id !== id) });
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
          }}
        >
          <SidebarTrigger />
          <Separator orientation="vertical" className="h-4" />
          <h1 style={{ fontSize: "14px", fontWeight: "600" }}>Gestão Administrativa</h1>
        </header>

        <div style={{ flex: 1, overflowY: "auto", padding: "24px" }}>
          <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
                <div style={{ display: "flex", gap: "4px", background: "#f1f5f9", padding: "4px", borderRadius: "8px" }}>
                  {[
                    { value: "secretarias", label: "Secretarias", icon: Building2 },
                    { value: "equipes", label: "Equipes", icon: Users },
                    { value: "colaboradores", label: "Colaboradores", icon: ShieldCheck },
                  ].map(({ value, label, icon: Icon }) => (
                    <button
                      key={value}
                      onClick={() => setAbaAtiva(value)}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "6px",
                        padding: "5px 12px",
                        borderRadius: "6px",
                        fontSize: "13px",
                        fontWeight: "500",
                        cursor: "pointer",
                        border: "none",
                        transition: "all .15s",
                        background: abaAtiva === value ? "white" : "transparent",
                        color: abaAtiva === value ? "#0f172a" : "#64748b",
                        boxShadow: abaAtiva === value ? "0 1px 3px rgba(0,0,0,0.08)" : "none",
                      }}
                    >
                      <Icon style={{ width: "14px", height: "14px" }} />
                      {label}
                    </button>
                  ))}
                </div>
                <Button size="sm" className="gap-2" onClick={() => abrirDialog()}>
                  <Plus className="w-4 h-4" /> {TITULO_DIALOG[abaAtiva]}
                </Button>
              </div>

              {["secretarias", "equipes", "colaboradores"].map((aba) => (
                <div key={aba} style={{ display: abaAtiva === aba ? "block" : "none" }}>
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-sm">{TITULO_CARD[aba]}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      {registros[aba].length === 0 ? (
                        <p className="py-10 text-center text-slate-400 italic text-xs">
                          Nenhum registro cadastrado. Clique em "{TITULO_DIALOG[aba]}" para começar.
                        </p>
                      ) : (
                        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                          {registros[aba].map((item) => (
                            <div
                              key={item.id}
                              style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "12px",
                                padding: "12px 16px",
                                borderRadius: "8px",
                                border: ".5px solid #e2e8f0",
                                background: "white",
                                flexWrap: "wrap",
                              }}
                            >
                              <div style={{ display: "flex", gap: "24px", flex: 1, flexWrap: "wrap" }}>
                                {CAMPOS[aba].map((campo) => (
                                  <div key={campo.name} style={{ display: "flex", flexDirection: "column", gap: "2px", minWidth: "120px" }}>
                                    <span style={{ fontSize: "10px", color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.05em" }}>{campo.label}</span>
                                    <span style={{ fontSize: "13px", fontWeight: "500", color: "#0f172a" }}>{item[campo.name]}</span>
                                  </div>
                                ))}
                              </div>
                              <div style={{ display: "flex", gap: "4px", flexShrink: 0 }}>
                                <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-slate-400 hover:text-blue-600" onClick={() => abrirDialog(item)}>
                                  <Pencil className="w-4 h-4" />
                                </Button>
                                <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-slate-400 hover:text-red-500" onClick={() => excluir(item.id)}>
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      <Dialog open={dialogAberto} onOpenChange={setDialogAberto}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editandoId ? TITULO_DIALOG_EDITAR[abaAtiva] : TITULO_DIALOG[abaAtiva]}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "4px" }}>
              {CAMPOS[abaAtiva].map((campo) => (
                <div key={campo.name} style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                  <label style={{ fontSize: "12px", fontWeight: "500", color: "#374151" }}>{campo.label}</label>
                  {abaAtiva === "equipes" && campo.name === "secretaria" ? (
                    <>
                      <Select
                        value={form[campo.name] ?? ""}
                        onValueChange={(val) => {
                          setForm((prev) => ({ ...prev, [campo.name]: val }));
                          if (erros[campo.name]) setErros((prev) => ({ ...prev, [campo.name]: null }));
                        }}
                      >
                        <SelectTrigger className="w-full" style={erros[campo.name] ? { borderColor: "#ef4444" } : {}}>
                          <SelectValue placeholder="Selecione uma secretaria" />
                        </SelectTrigger>
                        <SelectContent>
                          {registros.secretarias.length === 0 ? (
                            <SelectItem value="_empty" disabled>Nenhuma secretaria cadastrada</SelectItem>
                          ) : (
                            registros.secretarias.map((s) => (
                              <SelectItem key={s.id} value={s.nome}>{s.nome}</SelectItem>
                            ))
                          )}
                        </SelectContent>
                      </Select>
                      {erros[campo.name] && (
                        <span style={{ fontSize: "11px", color: "#ef4444" }}>{erros[campo.name]}</span>
                      )}
                    </>
                  ) : (
                    <>
                      <Input
                        placeholder={campo.label}
                        value={form[campo.name] ?? ""}
                        onChange={(e) => {
                          setForm((prev) => ({ ...prev, [campo.name]: e.target.value }));
                          if (erros[campo.name]) setErros((prev) => ({ ...prev, [campo.name]: null }));
                        }}
                        required
                        style={erros[campo.name] ? { borderColor: "#ef4444" } : {}}
                      />
                      {erros[campo.name] && (
                        <span style={{ fontSize: "11px", color: "#ef4444" }}>{erros[campo.name]}</span>
                      )}
                    </>
                  )}
                </div>
              ))}
            </div>
            <DialogFooter style={{ marginTop: "8px" }}>
              <Button type="submit" size="sm">Salvar</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
