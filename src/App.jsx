import { Routes, Route, Navigate } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import { PrivateRoute } from "@/components/PrivateRoute";

// Páginas
import Home from "@/pages/Home";
import OcorrenciasPage from "@/pages/Ocorrencias";
import NovaOcorrencia from "@/pages/Ocorrencias/NovaOcorrencia";
import Atendimento from "@/pages/Atendimento";
import Admin from "@/pages/Admin";

// Página de login (pública)
function Login() {
  return <div style={{ padding: "2rem" }}>Tela de Login — em breve</div>;
}

function App() {
  return (
    <SidebarProvider>
      <Routes>
        {/* Rota pública */}
        <Route path="/login" element={<Login />} />

        {/* Rotas protegidas — qualquer usuário logado */}
        <Route
          path="/home"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />

        <Route
          path="/ocorrencias"
          element={
            <PrivateRoute>
              <OcorrenciasPage />
            </PrivateRoute>
          }
        />

        <Route
          path="/ocorrencias/nova"
          element={
            <PrivateRoute>
              <NovaOcorrencia />
            </PrivateRoute>
          }
        />

        {/* Rotas protegidas — apenas atendente, gestor e admin */}
        <Route
          path="/atendimento"
          element={
            <PrivateRoute perfisPermitidos={["atendente", "gestor", "administrador"]}>
              <Atendimento />
            </PrivateRoute>
          }
        />

        {/* Rota protegida — apenas administrador */}
        <Route
          path="/admin"
          element={
            <PrivateRoute perfisPermitidos={["administrador"]}>
              <Admin />
            </PrivateRoute>
          }
        />

        {/* Redireciona raiz para home */}
        <Route path="/" element={<Navigate to="/home" replace />} />

        {/* Rota 404 */}
        <Route path="*" element={<div style={{ padding: "2rem" }}>Página não encontrada</div>} />
      </Routes>
    </SidebarProvider>
  );
}

export default App;
