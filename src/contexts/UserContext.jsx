// src/contexts/UserContext.jsx

import { createContext, useState } from "react";
import { useAuthentication, useUser } from "../hooks/apiHooks";
import { useNavigate } from "react-router-dom";

const UserContext = createContext(null);

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const { postLogin } = useAuthentication();
  const { getUserByToken } = useUser();
  const navigate = useNavigate();

  // 🔐 LOGIN
  const handleLogin = async (credentials) => {
    try {
      const loginResult = await postLogin(credentials);

      const token = loginResult.token;
      localStorage.setItem("token", token);

      const userResult = await getUserByToken(token);
      setUser(userResult.user);

      navigate("/");
    } catch (e) {
      console.log(e.message);
      throw e;
    }
  };

  // 🚪 LOGOUT
  const handleLogout = () => {
    try {
      localStorage.removeItem("token");
      setUser(null);
      navigate("/");
    } catch (e) {
      console.log(e.message);
    }
  };

  // ♻️ AUTOLOGIN – vain käyttäjän nouto, EI navigointia
  const handleAutoLogin = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        return;
      }

      const userResult = await getUserByToken(token);
      setUser(userResult.user);
    } catch (e) {
      console.log(e.message);
    }
  };

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        handleLogin,
        handleLogout,
        handleAutoLogin,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
