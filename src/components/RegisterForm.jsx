// src/components/RegisterForm.jsx

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../hooks/contextHooks";

const RegisterForm = () => {
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
    full_name: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { handleRegister } = useUserContext();
  const navigate = useNavigate();

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setInputs((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    setError("");
    setLoading(true);

    try {
      await handleRegister(inputs);
      alert("Rekisteröinti onnistui, voit nyt kirjautua sisään.");
      navigate("/login");
    } catch (e) {
      console.error(e);
      setError(e.message || "Rekisteröinti epäonnistui");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Register</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <div>
        <label htmlFor="username">Username</label>
        <input
          id="username"
          name="username"
          type="text"
          value={inputs.username}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label htmlFor="full_name">Full name</label>
        <input
          id="full_name"
          name="full_name"
          type="text"
          value={inputs.full_name}
          onChange={handleChange}
        />
      </div>

      <div>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          value={inputs.email}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label htmlFor="password">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          value={inputs.password}
          onChange={handleChange}
          required
        />
      </div>

      <button type="submit" disabled={loading}>
        {loading ? "Registering..." : "Register"}
      </button>
    </form>
  );
};

export default RegisterForm;
