// src/contexts/UserContext.jsx

import { createContext, useCallback, useState } from "react";

const baseUrl = import.meta.env.VITE_MEDIA_API;

export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // LOGIN
  const login = async (credentials) => {
    const resp = await fetch(`${baseUrl}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    if (!resp.ok) {
      throw new Error("Login epäonnistui");
    }

    const data = await resp.json();
    localStorage.setItem("user", JSON.stringify(data));
    setUser(data);
    return data;
  };

  // REGISTER
  const register = async (inputs) => {
    const resp = await fetch(`${baseUrl}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(inputs),
    });

    if (!resp.ok) {
      throw new Error("Rekisteröinti epäonnistui");
    }

    const data = await resp.json();
    return data;
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  // AUTOLOGIN
  const handleAutoLogin = useCallback(() => {
    const stored = localStorage.getItem("user");
    if (!stored) return;

    try {
      const storedUser = JSON.parse(stored);
      setUser(storedUser);
    } catch (e) {
      console.error(e);
      localStorage.removeItem("user");
    }
  }, []);

  const value = {
    user,
    setUser,
    handleAutoLogin,
    login,
    handleLogin: login,
    logout,
    handleLogout: logout,
    register,
    handleRegister: register,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
