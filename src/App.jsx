import { Routes, Route, Navigate } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import { PrivateRoute } from "@/components/PrivateRoute";

import Home from "@/pages/Home";
import OcorrenciasPage from "@/pages/Ocorrencias";
import NovaOcorrencia from "@/pages/Ocorrencias/NovaOcorrencia";
import Atendimento from "@/pages/Atendimento";
import Admin from "@/pages/Admin";
import Login from "@/pages/Login";

function LayoutProtegido({ children }) {
  return (
    <SidebarProvider
      style={{
        height: "100vh",
        overflow: "hidden",
        "--sidebar-width": "220px",
      }}
    >
      {children}
    </SidebarProvider>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route
        path="/home"
        element={
          <PrivateRoute>
            <LayoutProtegido>
              <Home />
            </LayoutProtegido>
          </PrivateRoute>
        }
      />

      <Route
        path="/ocorrencias"
        element={
          <PrivateRoute>
            <LayoutProtegido>
              <OcorrenciasPage />
            </LayoutProtegido>
          </PrivateRoute>
        }
      />

      <Route
        path="/ocorrencias/nova"
        element={
          <PrivateRoute>
            <LayoutProtegido>
              <NovaOcorrencia />
            </LayoutProtegido>
          </PrivateRoute>
        }
      />

      <Route
        path="/atendimento"
        element={
          <PrivateRoute perfisPermitidos={["atendente", "gestor", "administrador"]}>
            <LayoutProtegido>
              <Atendimento />
            </LayoutProtegido>
          </PrivateRoute>
        }
      />

      <Route
        path="/admin"
        element={
          <PrivateRoute perfisPermitidos={["administrador"]}>
            <LayoutProtegido>
              <Admin />
            </LayoutProtegido>
          </PrivateRoute>
        }
      />

      <Route path="/" element={<Navigate to="/home" replace />} />
      <Route path="*" element={<div style={{ padding: "2rem" }}>Página não encontrada</div>} />
    </Routes>
  );
}

export default App;
