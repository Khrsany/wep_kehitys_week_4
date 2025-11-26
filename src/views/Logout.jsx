// src/views/Logout.jsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthentication } from "../hooks/apiHooks";

export default function Logout() {
  const navigate = useNavigate();
  const { logout } = useAuthentication();

  useEffect(() => {
    logout();
    navigate("/login");
  }, [logout, navigate]);

  return <p>Logging out...</p>;
}
