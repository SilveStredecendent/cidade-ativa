import { AppSidebar } from "@/components/Sidebar";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Building2, Users, ShieldCheck, Plus } from "lucide-react";

export default function Admin() {
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
            <Tabs defaultValue="secretarias">
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
                <TabsList>
                  <TabsTrigger value="secretarias" className="gap-2">
                    <Building2 className="w-3.5 h-3.5" /> Secretarias
                  </TabsTrigger>
                  <TabsTrigger value="equipes" className="gap-2">
                    <Users className="w-3.5 h-3.5" /> Equipes
                  </TabsTrigger>
                  <TabsTrigger value="colaboradores" className="gap-2">
                    <ShieldCheck className="w-3.5 h-3.5" /> Colaboradores
                  </TabsTrigger>
                </TabsList>
                <Button size="sm" className="gap-2">
                  <Plus className="w-4 h-4" /> Novo Registro
                </Button>
              </div>

              <TabsContent value="secretarias">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm">Secretarias Ativas</CardTitle>
                  </CardHeader>
                  <CardContent className="py-10 text-center text-slate-400 italic text-xs">
                    Nenhuma secretaria cadastrada. Clique em 'Novo Registro' para começar.
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="equipes">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm">Equipes de Campo</CardTitle>
                  </CardHeader>
                  <CardContent className="py-10 text-center text-slate-400 italic text-xs">Nenhuma equipe operacional cadastrada.</CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
    </div>
  );
}
