// src/views/Home.jsx

import MediaRow from "../components/MediaRow";
import useMedia from "../hooks/apiHooks"; // 👈 Oikea import (default export)

const Home = () => {
  const { mediaArray } = useMedia(); // hook palauttaa mediaArray → noudetaan se tästä

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
