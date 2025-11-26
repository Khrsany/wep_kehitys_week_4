// src/views/Logout.jsx

import { useUserContext } from "../hooks/contextHooks";

const Logout = () => {
  const { handleLogout } = useUserContext();

  const onClick = () => {
    handleLogout();
  };

  return (
    <>
      <h1>Logout</h1>
      <button onClick={onClick}>Logout</button>
    </>
  );
};

export default Logout;
