// src/hooks/apiHooks.js

import { useState, useEffect } from "react";
import fetchData from "../utils/fetchData";

//
// ---------------------------------------------------
//  MEDIA FETCHING (useMedia)
// ---------------------------------------------------
//

export default function useMedia() {
  const [mediaArray, setMediaArray] = useState([]);

  // Hae kaikki media + niiden käyttäjänimi
  const getMedia = async () => {
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
  };

  useEffect(() => {
    getMedia();
  }, []);

  // 🔹 Poista media
  const deleteMedia = async (mediaId, token) => {
    try {
      const fetchOptions = {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const url = `${import.meta.env.VITE_MEDIA_API}/media/${mediaId}`;
      const result = await fetchData(url, fetchOptions);
      console.log("Delete media result:", result);
      return result;
    } catch (err) {
      console.error("Error in deleteMedia:", err);
      throw err;
    }
  };

  // 🔹 Muokkaa mediaa
  const modifyMedia = async (mediaId, inputs, token) => {
    try {
      const fetchOptions = {
        method: "PUT", // jos MediaAPI käyttää PATCHia, vaihda tähän "PATCH"
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(inputs),
      };

      const url = `${import.meta.env.VITE_MEDIA_API}/media/${mediaId}`;
      const result = await fetchData(url, fetchOptions);
      console.log("Modify media result:", result);
      return result;
    } catch (err) {
      console.error("Error in modifyMedia:", err);
      throw err;
    }
  };

  return { mediaArray, getMedia, deleteMedia, modifyMedia };
}

//
// ---------------------------------------------------
//  AUTHENTICATION HOOK (LOGIN + LOGOUT)
// ---------------------------------------------------
//

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

//
// ---------------------------------------------------
//  USER HOOK (GET USER BY TOKEN + REGISTER)
// ---------------------------------------------------
//

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

//
// ---------------------------------------------------
//  FILE UPLOAD HOOK (POST FILE TO UPLOAD SERVER)
// ---------------------------------------------------
//

export function useFile() {
  const postFile = async (file) => {
    try {
      const formData = new FormData();
      formData.append("file", file);

      const fetchOptions = {
        method: "POST",
        body: formData,
      };

      const uploadUrl = import.meta.env.VITE_UPLOAD_SERVER + "/upload";

      const result = await fetchData(uploadUrl, fetchOptions);
      console.log("File upload result:", result);
      return result;
    } catch (e) {
      console.error("Error in postFile:", e);
      throw e;
    }
  };

  return { postFile };
}

//
// ---------------------------------------------------
//  MEDIA METADATA UPLOAD (POST MEDIA TO MEDIA API)
// ---------------------------------------------------
//

export function useMediaUpload() {
  const postMedia = async (inputs, token) => {
    try {
      const fetchOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(inputs),
      };

      const mediaUrl = import.meta.env.VITE_MEDIA_API + "/media";

      const mediaResult = await fetchData(mediaUrl, fetchOptions);
      console.log("Media metadata upload result:", mediaResult);
      return mediaResult;
    } catch (e) {
      console.error("Error in postMedia:", e);
      throw e;
    }
  };

  return { postMedia };
}

//
// ---------------------------------------------------
//  LIKES HOOK (useLike)
//  HUOM: Endpoint-polut oletettu muotoon
//  GET  /likes/media/:media_id      -> palauttaa taulukon like-objekteja
//  POST /likes                      -> body { media_id }
//  DELETE /likes/:like_id
//  Jos dokumentti poikkeaa tästä, muuta URL:eja sen mukaan.
// ---------------------------------------------------
//

export function useLike() {
  const baseUrl = import.meta.env.VITE_MEDIA_API;

  // hae kaikki liket yhdelle medialle
  const getLikesByMediaId = async (mediaId) => {
    const url = `${baseUrl}/likes/media/${mediaId}`;
    const likes = await fetchData(url);
    return likes;
  };

  // lisää tykkäys kirjautuneelle käyttäjälle
  const postLike = async (mediaId) => {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("No auth token found for like");
    }

    const fetchOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ media_id: mediaId }),
    };

    const url = `${baseUrl}/likes`;
    const result = await fetchData(url, fetchOptions);
    console.log("Post like result:", result);
    return result;
  };

  // poista yksi like
  const deleteLike = async (likeId) => {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("No auth token found for like delete");
    }

    const fetchOptions = {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const url = `${baseUrl}/likes/${likeId}`;
    const result = await fetchData(url, fetchOptions);
    console.log("Delete like result:", result);
    return result;
  };

  return { getLikesByMediaId, postLike, deleteLike };
}
