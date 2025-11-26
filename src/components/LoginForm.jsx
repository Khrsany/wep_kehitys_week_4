// src/components/LoginForm.jsx
import { useNavigate } from "react-router-dom";
import useForm from "../hooks/formHooks";
import { useAuthentication } from "../hooks/apiHooks";

export default function LoginForm() {
  const navigate = useNavigate();
  const { postLogin } = useAuthentication();

  const initValues = {
    username: "",
    password: "",
  };

  const doLogin = async () => {
    try {
      console.log("Login form values:", inputs);
      const loginResult = await postLogin(inputs);

      // oletus: loginResult.token sisältää tokenin
      if (loginResult && loginResult.token) {
        localStorage.setItem("token", loginResult.token);
        // siirrytään Homeen
        navigate("/");
      } else {
        console.warn("No token in login result:", loginResult);
      }
    } catch (err) {
      console.error("Login failed:", err);
      alert("Login failed. Check username/password.");
    }
  };

  const { inputs, handleInputChange, handleSubmit } = useForm(
    doLogin,
    initValues
  );

  return (
    <>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="loginuser">Username</label>
          <input
            name="username"
            type="text"
            id="loginuser"
            onChange={handleInputChange}
            value={inputs.username}
            autoComplete="username"
          />
        </div>
        <div>
          <label htmlFor="loginpassword">Password</label>
          <input
            name="password"
            type="password"
            id="loginpassword"
            onChange={handleInputChange}
            value={inputs.password}
            autoComplete="current-password"
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </>
  );
}
