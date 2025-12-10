// src/components/Likes.jsx

import { useEffect, useState } from "react";
import { useUserContext } from "../hooks/contextHooks";
import { useLike } from "../hooks/apiHooks";

const Likes = ({ mediaId }) => {
  const { user } = useUserContext();
  const { getLikesByMediaId, postLike, deleteLike } = useLike();

  const [likeCount, setLikeCount] = useState(0);
  const [userLike, setUserLike] = useState(null); // like-objekti tai null
  const [loading, setLoading] = useState(true);

  const isLoggedIn = !!user;

  useEffect(() => {
    const fetchLikes = async () => {
      try {
        setLoading(true);
        const likes = await getLikesByMediaId(mediaId);

        // likes oletetaan taulukoksi: [{ like_id, user_id, media_id, ... }, ...]
        setLikeCount(Array.isArray(likes) ? likes.length : 0);

        if (user && Array.isArray(likes)) {
          const found = likes.find((like) => like.user_id === user.user_id);
          setUserLike(found || null);
        } else {
          setUserLike(null);
        }
      } catch (err) {
        console.error("Error fetching likes:", err);
        setLikeCount(0);
        setUserLike(null);
      } finally {
        setLoading(false);
      }
    };

    fetchLikes();
  }, [mediaId, user, getLikesByMediaId]);

  const handleToggleLike = async () => {
    if (!isLoggedIn) return;

    try {
      if (userLike) {
        // poista like
        await deleteLike(userLike.like_id);
        setUserLike(null);
        setLikeCount((prev) => Math.max(prev - 1, 0));
      } else {
        // lisää like
        const newLike = await postLike(mediaId);
        setUserLike(newLike);
        setLikeCount((prev) => prev + 1);
      }
    } catch (err) {
      console.error("Error toggling like:", err);
    }
  };

  const baseButtonClasses =
    "inline-flex items-center gap-1 rounded-md border border-slate-300 px-3 py-1 text-sm font-medium transition";

  const activeClasses = "bg-rose-500 text-white hover:bg-rose-600";
  const inactiveClasses = "bg-white text-slate-700 hover:bg-slate-50";

  return (
    <div className="mt-2 flex items-center gap-3">
      <button
        type="button"
        onClick={handleToggleLike}
        disabled={!isLoggedIn || loading}
        className={
          baseButtonClasses +
          " " +
          (userLike ? activeClasses : inactiveClasses) +
          (!isLoggedIn || loading ? " opacity-60 cursor-not-allowed" : "")
        }
      >
        <span>{userLike ? "♥ Liked" : "♡ Like"}</span>
        <span className="text-xs">{likeCount}</span>
      </button>

      {!isLoggedIn && (
        <span className="text-xs text-slate-500">
          Log in to like this media
        </span>
      )}
    </div>
  );
};

export default Likes;
