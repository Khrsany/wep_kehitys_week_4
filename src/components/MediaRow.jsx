// src/components/MediaRow.jsx

import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useUserContext } from "../hooks/contextHooks";

const MediaRow = ({ item }) => {
  const { user } = useUserContext();

  // käyttäjä saa muokata/poistaa jos:
  // 1) on median omistaja TAI 2) on admin
  const canModifyOrDelete =
    user && (user.user_id === item.user_id || user.role === "admin");

  const handleModify = () => {
    console.log("Modify media:", item);
    // myöhemmin tänne navigate + modify-sivu tms.
  };

  const handleDelete = () => {
    console.log("Delete media:", item);
    // myöhemmin tänne deleteMedia-api kutsu + päivitys
  };

  const thumbnailSrc = item.thumbnail || item.filename;

  return (
    <tr className="border-b border-slate-200 hover:bg-slate-50">
      {/* Thumbnail */}
      <td className="px-3 py-2 align-top">
        <img
          src={thumbnailSrc}
          alt={item.title}
          className="h-20 w-32 rounded object-cover"
        />
      </td>

      {/* Title + description */}
      <td className="px-3 py-2 align-top text-sm text-slate-800">
        <div className="font-semibold">{item.title}</div>
        {item.description && (
          <p className="mt-1 text-xs text-slate-600 line-clamp-3">
            {item.description}
          </p>
        )}
      </td>

      {/* Created at */}
      <td className="px-3 py-2 align-top text-sm text-slate-700 whitespace-nowrap">
        {new Date(item.created_at).toLocaleString("fi-FI")}
      </td>

      {/* Filesize */}
      <td className="px-3 py-2 align-top text-sm text-slate-700">
        {item.filesize}
      </td>

      {/* Media type */}
      <td className="px-3 py-2 align-top text-sm text-slate-700">
        {item.media_type}
      </td>

      {/* Username */}
      <td className="px-3 py-2 align-top text-sm text-slate-700">
        {item.username}
      </td>

      {/* Actions: Show / Modify / Delete */}
      <td className="px-3 py-2 align-top text-sm">
        <div className="flex flex-col gap-2">
          {/* Show */}
          <Link
            to="/single"
            state={{ item }}
            className="inline-flex items-center justify-center rounded-md bg-sky-600 px-3 py-1 text-xs font-medium text-white hover:bg-sky-700"
          >
            Show
          </Link>

          {/* Modify & Delete vain owner/admin */}
          {canModifyOrDelete && (
            <>
              <button
                type="button"
                onClick={handleModify}
                className="inline-flex items-center justify-center rounded-md bg-amber-500 px-3 py-1 text-xs font-medium text-white hover:bg-amber-600"
              >
                Modify
              </button>
              <button
                type="button"
                onClick={handleDelete}
                className="inline-flex items-center justify-center rounded-md bg-rose-600 px-3 py-1 text-xs font-medium text-white hover:bg-rose-700"
              >
                Delete
              </button>
            </>
          )}
        </div>
      </td>
    </tr>
  );
};

MediaRow.propTypes = {
  item: PropTypes.shape({
    media_id: PropTypes.number.isRequired,
    user_id: PropTypes.number,
    filename: PropTypes.string.isRequired,
    thumbnail: PropTypes.string,
    filesize: PropTypes.number.isRequired,
    media_type: PropTypes.string.isRequired,
    title: PropTypes.string,
    description: PropTypes.string,
    created_at: PropTypes.string.isRequired,
    username: PropTypes.string,
  }).isRequired,
};

export default MediaRow;
