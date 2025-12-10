// src/views/Single.jsx

import { useLocation, useNavigate } from "react-router-dom";
import Likes from "../components/Likes";

const Single = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state || !state.item) {
    return (
      <section className="min-h-[60vh] flex items-center justify-center bg-slate-100">
        <div className="max-w-md rounded-xl bg-white p-6 shadow">
          <h2 className="mb-2 text-xl font-semibold text-slate-900">
            No media selected
          </h2>
          <p className="mb-4 text-sm text-slate-600">
            Please go back and choose a media item from the list.
          </p>
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="inline-flex items-center rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800"
          >
            Go back
          </button>
        </div>
      </section>
    );
  }

  const { item } = state;

  const isImage =
    typeof item.media_type === "string" && item.media_type.startsWith("image/");
  const isVideo =
    typeof item.media_type === "string" && item.media_type.startsWith("video/");

  return (
    <section className="min-h-[60vh] bg-slate-100 py-10">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl rounded-xl bg-white p-6 shadow">
          <h2 className="mb-2 text-2xl font-bold text-slate-900">
            {item.title}
          </h2>

          {item.description && (
            <p className="mb-2 text-sm text-slate-700">{item.description}</p>
          )}

          <p className="mb-4 text-xs text-slate-500">
            <span className="font-semibold">Owner:</span> {item.username}
          </p>

          {isImage && (
            <img
              src={item.filename}
              alt={item.title}
              className="mb-4 max-h-[500px] w-full rounded-lg object-contain"
            />
          )}

          {isVideo && (
            <video
              controls
              className="mb-4 max-h-[500px] w-full rounded-lg bg-black"
            >
              <source src={item.filename} type={item.media_type} />
              Your browser does not support the video tag.
            </video>
          )}

          {/* Likes-komponentti */}
          <Likes mediaId={item.media_id} />

          <div className="mt-6">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="inline-flex items-center rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800"
            >
              Go back
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Single;
