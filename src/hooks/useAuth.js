import { useAuthContext } from "@/context/AuthContext";

// Hook público — use este em todos os componentes que precisam de acesso ao contexto de autenticação

export function useAuth() {
  return useAuthContext();
}
