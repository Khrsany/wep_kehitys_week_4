// src/hooks/contextHooks.js

import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";

// Custom hook, jolla käytetään UserContextia turvallisesti
const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return context;
};

export { useUserContext };
