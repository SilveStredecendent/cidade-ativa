import { AppSidebar } from "@/components/Sidebar";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { LayoutDashboard, ClipboardList, Clock, CheckCircle2, Users } from "lucide-react";

export default function Atendimento() {
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
          <h1 style={{ fontSize: "14px", fontWeight: "600" }}>Painel de Atendimento</h1>
        </header>

        <div style={{ flex: 1, overflowY: "auto", padding: "24px" }}>
          <div style={{ maxWidth: "1200px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "24px" }}>
            {/* Cards de Métricas */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "16px" }}>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-xs font-bold uppercase text-slate-500">Total Ocorrências</CardTitle>
                  <ClipboardList className="h-4 w-4 text-blue-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">128</div>
                  <p className="text-[10px] text-slate-400">+12% em relação ao mês anterior</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-xs font-bold uppercase text-slate-500">Tempo Médio</CardTitle>
                  <Clock className="h-4 w-4 text-orange-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">4.2 dias</div>
                  <p className="text-[10px] text-slate-400">Meta: 3 dias</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-xs font-bold uppercase text-slate-500">Resolvidas</CardTitle>
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">84</div>
                  <p className="text-[10px] text-slate-400">Taxa de solução: 65%</p>
                </CardContent>
              </Card>
            </div>

            {/* Tabela de Ordens de Serviço (OS) */}
            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-bold">Fila de Trabalho (OS)</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Protocolo</TableHead>
                      <TableHead>Assunto</TableHead>
                      <TableHead>Prioridade</TableHead>
                      <TableHead>Equipe Responsável</TableHead>
                      <TableHead className="text-right">Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-mono text-xs">#2026-001</TableCell>
                      <TableCell className="font-medium">Buraco na Via - Av. Brasil</TableCell>
                      <TableCell>
                        <Badge className="bg-red-100 text-red-700">Alta</Badge>
                      </TableCell>
                      <TableCell>Equipe Obras A</TableCell>
                      <TableCell className="text-right">
                        <Button variant="outline" size="sm" className="text-[10px] h-7">
                          Gerenciar
                        </Button>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
