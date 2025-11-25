import { useState, useEffect } from "react";
import fetchData from "../utils/fetchData";

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
    // kutsutaan vain kerran (initial render)
    getMedia();
  }, []);

  return { mediaArray };
}
