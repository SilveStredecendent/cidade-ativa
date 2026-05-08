import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import { Badge } from "@/components/ui/badge";
import { Home, MapPin, ClipboardList, LayoutDashboard, ShieldCheck, Bell, Settings, LogOut } from "lucide-react";

const NAV_ITEMS = {
  cidadao: [
    { label: "Início", icon: Home, to: "/home" },
    { label: "Ocorrências", icon: MapPin, to: "/ocorrencias" },
    { label: "Notificações", icon: Bell, to: "/notificacoes", badge: 2 },
  ],
  atendente: [
    { label: "Início", icon: Home, to: "/home" },
    { label: "Atendimento", icon: ClipboardList, to: "/atendimento" },
    { label: "Ocorrências", icon: MapPin, to: "/ocorrencias" },
    { label: "Notificações", icon: Bell, to: "/notificacoes", badge: 2 },
  ],
  gestor: [
    { label: "Início", icon: Home, to: "/home" },
    { label: "Atendimento", icon: ClipboardList, to: "/atendimento" },
    { label: "Ocorrências", icon: MapPin, to: "/ocorrencias" },
    { label: "Dashboard", icon: LayoutDashboard, to: "/dashboard" },
    { label: "Notificações", icon: Bell, to: "/notificacoes", badge: 2 },
  ],
  administrador: [
    { label: "Início", icon: Home, to: "/home" },
    { label: "Atendimento", icon: ClipboardList, to: "/atendimento" },
    { label: "Ocorrências", icon: MapPin, to: "/ocorrencias" },
    { label: "Dashboard", icon: LayoutDashboard, to: "/dashboard" },
    { label: "Administração", icon: ShieldCheck, to: "/admin" },
    { label: "Notificações", icon: Bell, to: "/notificacoes", badge: 2 },
  ],
};

const PERFIL_LABEL = {
  cidadao: "Cidadão",
  atendente: "Atendente",
  gestor: "Gestor",
  administrador: "Administrador",
};

export function AppSidebar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const perfil = user?.perfil ?? "cidadao";
  const itens = NAV_ITEMS[perfil] ?? NAV_ITEMS.cidadao;
  const inicial = user?.nome?.charAt(0)?.toUpperCase() ?? "?";

  function handleLogout() {
    logout();
    navigate("/login");
  }

  function estaAtivo(to) {
    return location.pathname === to || (to !== "/home" && location.pathname.startsWith(to));
  }

  return (
    <Sidebar>
      {/* Header */}
      <SidebarHeader style={{ padding: "16px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div
            style={{
              width: "36px",
              height: "36px",
              borderRadius: "10px",
              background: "var(--color-text-primary)",
              color: "var(--color-background-primary)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "13px",
              fontWeight: "700",
              letterSpacing: "-0.5px",
              flexShrink: 0,
            }}
          >
            CA
          </div>
          <div>
            <p style={{ fontSize: "14px", fontWeight: "600", color: "var(--color-text-primary)", margin: 0 }}>Cidade Ativa</p>
            <p style={{ fontSize: "11px", color: "var(--color-text-tertiary)", margin: 0 }}>Gestão Urbana</p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarSeparator style={{ margin: "5px 0" }} />

      {/* Navegação */}
      <SidebarContent style={{ padding: "8px" }}>
        <SidebarGroup>
          <SidebarGroupLabel style={{ fontSize: "10px", letterSpacing: "0.08em" }}>Navegação</SidebarGroupLabel>
          <SidebarMenu>
            {itens.map((item) => (
              <SidebarMenuItem key={item.to}>
                <SidebarMenuButton onClick={() => navigate(item.to)} isActive={estaAtivo(item.to)} style={{ gap: "10px" }}>
                  <item.icon style={{ width: "15px", height: "15px", flexShrink: 0 }} />
                  <span style={{ flex: 1, fontSize: "13px" }}>{item.label}</span>
                  {item.badge && (
                    <Badge variant="secondary" style={{ fontSize: "10px", height: "18px", minWidth: "18px", padding: "0 5px" }}>
                      {item.badge}
                    </Badge>
                  )}
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <SidebarSeparator style={{ margin: "5px 0" }} />

      {/* Footer */}
      <SidebarFooter style={{ padding: "12px" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            padding: "8px 10px",
            background: "var(--color-background-secondary)",
            borderRadius: "var(--border-radius-md)",
            marginBottom: "6px",
          }}
        >
          <div
            style={{
              width: "32px",
              height: "32px",
              flexShrink: 0,
              borderRadius: "50%",
              background: "var(--color-background-tertiary)",
              border: "1.5px solid var(--color-border-secondary)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "13px",
              fontWeight: "600",
              color: "var(--color-text-secondary)",
            }}
          >
            {inicial}
          </div>
          <div style={{ overflow: "hidden", flex: 1 }}>
            <p
              style={{
                fontSize: "13px",
                fontWeight: "500",
                color: "var(--color-text-primary)",
                margin: 0,
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {user?.nome ?? "Usuário"}
            </p>
            <p style={{ fontSize: "11px", color: "var(--color-text-tertiary)", margin: 0 }}>{PERFIL_LABEL[perfil]}</p>
          </div>
        </div>

        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton onClick={() => navigate("/configuracoes")} style={{ gap: "10px" }}>
              <Settings style={{ width: "14px", height: "14px" }} />
              <span style={{ fontSize: "13px" }}>Configurações</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton onClick={handleLogout} style={{ gap: "10px", color: "var(--color-text-danger)" }}>
              <LogOut style={{ width: "14px", height: "14px" }} />
              <span style={{ fontSize: "13px" }}>Sair</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
