// src/views/Profile.jsx
import { useEffect, useState } from "react";
import { useUser } from "../hooks/apiHooks";

export default function Profile() {
  const [user, setUser] = useState(null);
  const { getUserByToken } = useUser();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.log("No token, user not logged in");
      return;
    }

    const fetchUser = async () => {
      try {
        const userData = await getUserByToken(token);
        setUser(userData);
      } catch (err) {
        console.error("Error loading user profile:", err);
      }
    };

    fetchUser();
  }, []);

  if (!user) {
    return <p>No user logged in.</p>;
  }

  return (
    <div>
      <h1>Profile</h1>
      <p>Username: {user.username}</p>
      <p>Email: {user.email}</p>
      {/* Voit lisätä muita kenttiä, jos API palauttaa esim. full_name tms. */}
    </div>
  );
}
