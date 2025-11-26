// src/views/Login.jsx
import { useState } from "react";
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";

export default function Login() {
  const [showRegister, setShowRegister] = useState(false);

  return (
    <div>
      <div style={{ marginBottom: "1rem" }}>
        <button onClick={() => setShowRegister(false)}>Show Login</button>
        <button onClick={() => setShowRegister(true)}>Show Register</button>
      </div>

      {showRegister ? <RegisterForm /> : <LoginForm />}
    </div>
  );
}
