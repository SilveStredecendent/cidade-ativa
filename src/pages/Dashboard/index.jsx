import { AppSidebar } from "@/components/Sidebar";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Activity, Users, ShieldAlert, BarChart3 } from "lucide-react";

export default function DashboardGestao() {
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
          <h1 style={{ fontSize: "14px", fontWeight: "600", margin: 0, color: "#0f172a" }}>Visão Geral (Dashboard)</h1>
        </header>

        <div style={{ flex: 1, overflowY: "auto", padding: "24px" }}>
          <div style={{ maxWidth: "1000px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "24px" }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "16px" }}>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-slate-500">Cidadãos Cadastrados</CardTitle>
                  <Users className="h-4 w-4 text-blue-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-slate-800">12.450</div>
                  <p className="text-xs text-slate-400">+180 novos este mês</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-slate-500">Volume Total (Ano)</CardTitle>
                  <Activity className="h-4 w-4 text-green-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-slate-800">3.842</div>
                  <p className="text-xs text-slate-400">Ocorrências registradas</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-slate-500">Tempo Médio SLA</CardTitle>
                  <ShieldAlert className="h-4 w-4 text-orange-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-slate-800">48h</div>
                  <p className="text-xs text-slate-400">Para resolução de chamados</p>
                </CardContent>
              </Card>
            </div>

            <Card style={{ border: ".5px solid #e2e8f0", boxShadow: "0 1px 2px rgba(0,0,0,0.05)" }}>
              <CardHeader>
                <CardTitle className="text-sm flex items-center gap-2">
                  <BarChart3 className="w-4 h-4" /> Desempenho do Sistema
                </CardTitle>
                <CardDescription className="text-xs">Volume de ocorrências resolvidas nos últimos 6 meses.</CardDescription>
              </CardHeader>
              <CardContent>
                <div
                  style={{
                    height: "200px",
                    width: "100%",
                    background: "#f1f5f9",
                    borderRadius: "8px",
                    border: "1px dashed #cbd5e1",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <p className="text-xs text-slate-400 font-medium">Área reservada para gráfico (Recharts)</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
