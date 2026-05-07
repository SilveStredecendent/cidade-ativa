import { Navigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

export function PrivateRoute({ children, perfisPermitidos }) {
  const { isAuthenticated, hasPermission } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (perfisPermitidos && !hasPermission(perfisPermitidos)) {
    return <Navigate to="/home" replace />;
  }

  return children;
}
