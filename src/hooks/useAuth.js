import { useAuthContext } from "@/context/AuthContext";

// Hook público — use este em todos os componentes
// Exemplo de uso:

export function useAuth() {
  return useAuthContext();
}
