// src/views/Login.jsx

import { useState } from "react";
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";

const Login = () => {
  const [showLogin, setShowLogin] = useState(true);

  return (
    <>
      <button onClick={() => setShowLogin(true)}>Show Login</button>
      <button onClick={() => setShowLogin(false)}>Show Register</button>

      {showLogin ? <LoginForm /> : <RegisterForm />}
    </>
  );
};

export default Login;
