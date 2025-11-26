// src/components/RegisterForm.jsx
import useForm from "../hooks/formHooks";
import { useUser } from "../hooks/apiHooks";

export default function RegisterForm() {
  const { postUser } = useUser();

  const initValues = {
    username: "",
    password: "",
    email: "",
  };

  const doRegister = async () => {
    try {
      console.log("Register form values:", inputs);
      const result = await postUser(inputs);
      console.log("Register result:", result);
      alert("User registered successfully (check console for details).");
    } catch (err) {
      console.error("Register failed:", err);
      alert("Register failed. See console for details.");
    }
  };

  const { inputs, handleInputChange, handleSubmit } = useForm(
    doRegister,
    initValues
  );

  return (
    <>
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="reguser">Username</label>
          <input
            name="username"
            type="text"
            id="reguser"
            onChange={handleInputChange}
            value={inputs.username}
            autoComplete="username"
          />
        </div>
        <div>
          <label htmlFor="regemail">Email</label>
          <input
            name="email"
            type="email"
            id="regemail"
            onChange={handleInputChange}
            value={inputs.email}
            autoComplete="email"
          />
        </div>
        <div>
          <label htmlFor="regpassword">Password</label>
          <input
            name="password"
            type="password"
            id="regpassword"
            onChange={handleInputChange}
            value={inputs.password}
            autoComplete="new-password"
          />
        </div>
        <button type="submit">Register</button>
      </form>
    </>
  );
}
