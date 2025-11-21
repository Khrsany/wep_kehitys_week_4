// src/views/Home.jsx

import { useEffect, useState } from "react";
import MediaRow from "../components/MediaRow";
import fetchData from "../utils/fetchData";

const Home = () => {
  const [mediaArray, setMediaArray] = useState([]);

  const getMedia = async () => {
    try {
      // 1. Hae media-lista MEDIA APIsta
      const mediaUrl = import.meta.env.VITE_MEDIA_API + "/media";
      const media = await fetchData(mediaUrl);

      // 2. Hae jokaiselle mediakohteelle käyttäjän nimi AUTH APIsta
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
            // Jos käyttäjän haku epäonnistuu, palauta silti media
            return { ...item, username: "Unknown" };
          }
        })
      );

      setMediaArray(mediaWithUsers);
      console.log("Media with users:", mediaWithUsers);
    } catch (error) {
      console.error("Error in getMedia:", error);
    }
  };

  useEffect(() => {
    // kutsutaan vain kerran (initial render)
    getMedia();
  }, []);

  return (
    <>
      <h2>My Media</h2>
      <table>
        <thead>
          <tr>
            <th>Thumbnail</th>
            <th>Title</th>
            <th>Description</th>
            <th>Created</th>
            <th>Size</th>
            <th>Type</th>
            <th>Owner</th>
            <th>Show</th>
          </tr>
        </thead>
        <tbody>
          {mediaArray.map((item) => (
            <MediaRow key={item.media_id} item={item} />
          ))}
          {mediaArray.length === 0 && (
            <tr>
              <td colSpan="8">Loading media...</td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
};

export default Home;
