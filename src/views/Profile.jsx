// src/views/Profile.jsx

import { useUserContext } from "../hooks/contextHooks";

const Profile = () => {
  const { user } = useUserContext();

  if (!user) {
    return (
      <div>
        <h1>Profile</h1>
        <p>No user logged in.</p>
      </div>
    );
  }

  return (
    <div>
      <h1>Profile</h1>
      <p>Username: {user.username}</p>
      <p>Email: {user.email}</p>
    </div>
  );
};

export default Profile;
