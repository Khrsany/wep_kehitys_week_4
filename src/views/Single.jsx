// src/views/Single.jsx

import { useLocation, useNavigate } from "react-router";

const Single = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state || !state.item) {
    return (
      <section>
        <h2>No media selected</h2>
        <button type="button" onClick={() => navigate(-1)}>
          Go back
        </button>
      </section>
    );
  }

  const { item } = state;

  const isImage =
    typeof item.media_type === "string" && item.media_type.startsWith("image/");
  const isVideo =
    typeof item.media_type === "string" && item.media_type.startsWith("video/");

  return (
    <section>
      <h2>{item.title}</h2>
      <p>{item.description}</p>
      <p>
        <strong>Owner:</strong> {item.username}
      </p>

      {isImage && (
        <img
          src={item.filename}
          alt={item.title}
          style={{ maxWidth: "100%", display: "block", marginBottom: "1rem" }}
        />
      )}

      {isVideo && (
        <video
          controls
          style={{ maxWidth: "100%", display: "block", marginBottom: "1rem" }}
        >
          <source src={item.filename} type={item.media_type} />
          Your browser does not support the video tag.
        </video>
      )}

      <button type="button" onClick={() => navigate(-1)}>
        Go back
      </button>
    </section>
  );
};

export default Single;
