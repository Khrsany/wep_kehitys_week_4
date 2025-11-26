// src/hooks/apiHooks.js
import { useState, useEffect } from "react";
import fetchData from "../utils/fetchData";

// ---------- MEDIAT (entinen hooki, ei muutosta logiikkaan) ----------
export default function useMedia() {
  const [mediaArray, setMediaArray] = useState([]);

  async function getMedia() {
    try {
      const mediaUrl = import.meta.env.VITE_MEDIA_API + "/media";
      const media = await fetchData(mediaUrl);

      const authBaseUrl = import.meta.env.VITE_AUTH_API + "/users/";

      const mediaWithUsers = await Promise.all(
        media.map(async (item) => {
          try {
            const user = await fetchData(authBaseUrl + item.user_id);
            return { ...item, username: user.username };
          } catch (err) {
            console.error(
              "Error fetching user for media_id",
              item.media_id,
              err
            );
            return { ...item, username: "Unknown" };
          }
        })
      );

      setMediaArray(mediaWithUsers);
    } catch (error) {
      console.error("Error in getMedia:", error);
    }
  }

  useEffect(() => {
    getMedia();
  }, []);

  return { mediaArray };
}

// ---------- AUTHENTICATION (login + logout) ----------
export function useAuthentication() {
  const postLogin = async (inputs) => {
    try {
      const fetchOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(inputs),
      };

      const loginResult = await fetchData(
        import.meta.env.VITE_AUTH_API + "/auth/login",
        fetchOptions
      );

      console.log("Login result:", loginResult);
      return loginResult;
    } catch (err) {
      console.error("Error in postLogin:", err);
      throw err;
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
  };

  return { postLogin, logout };
}

// ---------- USER (profiili + rekisteröinti) ----------
export function useUser() {
  const getUserByToken = async (token) => {
    try {
      const fetchOptions = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const user = await fetchData(
        import.meta.env.VITE_AUTH_API + "/users/token",
        fetchOptions
      );

      console.log("User by token:", user);
      return user;
    } catch (err) {
      console.error("Error in getUserByToken:", err);
      throw err;
    }
  };

  const postUser = async (inputs) => {
    try {
      const fetchOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(inputs),
      };

      const result = await fetchData(
        import.meta.env.VITE_AUTH_API + "/users",
        fetchOptions
      );

      console.log("Register result:", result);
      return result;
    } catch (err) {
      console.error("Error in postUser:", err);
      throw err;
    }
  };

  return { getUserByToken, postUser };
}
