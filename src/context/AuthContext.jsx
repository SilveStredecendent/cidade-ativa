import { createContext, useContext, useState, useEffect } from "react";

const TOKEN_KEY = "@cidadeativa:token";
const USER_KEY = "@cidadeativa:user";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem(USER_KEY);
    return stored ? JSON.parse(stored) : null;
  });

  const [token, setToken] = useState(() => {
    return localStorage.getItem(TOKEN_KEY) || null;
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (token) {
      localStorage.setItem(TOKEN_KEY, token);
    } else {
      localStorage.removeItem(TOKEN_KEY);
    }
  }, [token]);

  useEffect(() => {
    if (user) {
      localStorage.setItem(USER_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(USER_KEY);
    }
  }, [user]);

  function login(userData, userToken) {
    setUser(userData);
    setToken(userToken);
  }

  function logout() {
    setUser(null);
    setToken(null);
  }

  function hasPermission(perfisPermitidos) {
    if (!user) return false;
    if (Array.isArray(perfisPermitidos)) {
      return perfisPermitidos.includes(user.perfil);
    }
    return user.perfil === perfisPermitidos;
  }

  const isAuthenticated = !!token && !!user;

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        isAuthenticated,
        login,
        logout,
        hasPermission,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext deve ser usado dentro de AuthProvider");
  }
  return context;
}
