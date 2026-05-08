import { AppSidebar } from "@/components/Sidebar";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { User, Lock } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

export default function ConfiguracoesPage() {
  const { user } = useAuth();

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
        {/* Header Fixo */}
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
          <h1 style={{ fontSize: "14px", fontWeight: "600", margin: 0, color: "#0f172a" }}>Configurações</h1>
        </header>

        {/* Área de Rolagem do Conteúdo */}
        <div style={{ flex: 1, overflowY: "auto", padding: "24px" }}>
          <div style={{ maxWidth: "600px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "20px" }}>
            {/* Card de Perfil */}
            <Card style={{ border: ".5px solid #e2e8f0", boxShadow: "0 1px 2px rgba(0,0,0,0.05)" }}>
              <CardHeader className="border-b bg-slate-50/50">
                <CardTitle className="text-sm flex items-center gap-2 text-slate-800">
                  <User className="w-4 h-4" /> Perfil do Usuário
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label style={{ fontSize: "11px", fontWeight: "700", textTransform: "uppercase", color: "#64748b" }}>Nome Completo</label>
                    <Input defaultValue={user?.nome || "Cidadão Teste"} style={{ height: "40px", fontSize: "13px" }} />
                  </div>
                  <div className="space-y-1.5">
                    <label style={{ fontSize: "11px", fontWeight: "700", textTransform: "uppercase", color: "#64748b" }}>E-mail</label>
                    <Input
                      defaultValue={user?.email || "cidadao@email.com"}
                      disabled
                      style={{ height: "40px", fontSize: "13px", background: "#f8fafc" }}
                    />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label style={{ fontSize: "11px", fontWeight: "700", textTransform: "uppercase", color: "#64748b" }}>Perfil de Acesso</label>
                  <Input
                    defaultValue={user?.perfil || "Cidadão"}
                    disabled
                    className="capitalize"
                    style={{ height: "40px", fontSize: "13px", background: "#f8fafc" }}
                  />
                </div>
                <Button size="sm" style={{ fontWeight: "600" }}>
                  Salvar Alterações
                </Button>
              </CardContent>
            </Card>

            {/* Card de Segurança */}
            <Card style={{ border: ".5px solid #e2e8f0", boxShadow: "0 1px 2px rgba(0,0,0,0.05)" }}>
              <CardHeader className="border-b bg-slate-50/50">
                <CardTitle className="text-sm flex items-center gap-2 text-slate-800">
                  <Lock className="w-4 h-4" /> Segurança
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <p style={{ fontSize: "13px", color: "#64748b", margin: 0 }}>Mude sua senha regularmente para manter sua conta segura.</p>
                <Button variant="outline" size="sm" style={{ fontWeight: "600" }}>
                  Alterar Senha
                </Button>
              </CardContent>
            </Card>

            {/* Rodapé da Tela */}
            <div style={{ textAlign: "center", marginTop: "16px" }}>
              <p style={{ fontSize: "10px", color: "#cbd5e1", textTransform: "uppercase", fontWeight: "700", letterSpacing: "0.05em", margin: 0 }}>
                Cidade Ativa v1.0.0 // Ourinhos-SP
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
