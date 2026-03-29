import React, { createContext, useContext, useEffect, useState } from "react";
import api from "@/config/api";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => 
    localStorage.getItem("userToken") || localStorage.getItem("authToken") || null
  );
  const [user, setUser] = useState(() => {
    const raw = localStorage.getItem("user") || localStorage.getItem("userData");
    if (!raw) return null;
    try {
      return JSON.parse(raw);
    } catch (e) {
      return null;
    }
  });
  const [loading, setLoading] = useState(false);

  const fetchUser = async () => {
    if (!token) return;
    setLoading(true);
    try {
      const response = await api.get("/user");
      const userData = response.data;
      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));
    } catch (error) {
      console.error("Error fetching user data:", error);
      // Si falla la autenticación, cerramos sesión
      if (error.response && error.response.status === 401) {
        logout();
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      localStorage.setItem("userToken", token);
      // Mantener compatibilidad con authToken también
      localStorage.setItem("authToken", token);
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      
      // Fetch user data to ensure we have the latest info (including customer data)
      fetchUser();
    } else {
      localStorage.removeItem("userToken");
      localStorage.removeItem("authToken");
      delete api.defaults.headers.common["Authorization"];
      setUser(null);
    }
  }, [token]);

  useEffect(() => {
    if (user) localStorage.setItem("user", JSON.stringify(user));
    else localStorage.removeItem("user");
  }, [user]);

  const login = (authToken, userData) => {
    setToken(authToken);
    setUser(userData || null);
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("userToken");
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    localStorage.removeItem("userData");
    delete api.defaults.headers.common["Authorization"];
  };

  const value = {
    token,
    user,
    loading,
    setLoading,
    login,
    logout,
    fetchUser,
    isAuthenticated: !!token,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}

export default AuthContext;
