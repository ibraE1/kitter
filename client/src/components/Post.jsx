import { useEffect, useState } from "react";
import { HeartIcon, TrashIcon } from "@heroicons/react/24/solid";
import { deletePost, likePost, unlikePost } from "../api/post";

function Post({ data, currentUser, removePost }) {
  const [likeCount, setLikeCount] = useState(data.likes.length);
  const [isLiked, setIsLiked] = useState(data.likes.includes(currentUser));

  const like = async () => {
    setLikeCount(likeCount + 1);
    await likePost(data._id);
  };

  const unlike = async () => {
    setLikeCount(likeCount - 1);
    await unlikePost(data._id);
  };

  const handleLike = async () => {
    if (isLiked) {
      setIsLiked(false);
      unlike();
    } else {
      setIsLiked(true);
      like();
    }
  };

  const handleDelete = async () => {
    await deletePost(data._id);
    removePost(data._id);
  };

  return (
    <div className="w-full border-b-2 border-slate-200">
      <div className="flex w-full md:w-2/5 p-3 gap-3 justify-between items-center ">
        <div className="flex flex-col justify-around">
          <div className="flex items-center gap-1 text-lg md:text-xl">
            <p className="font-bold">{data.author.displayName}</p>
            <p className="font-black text-slate-500 mb-2">.</p>
            <p className="text-slate-500">{data.author.username}</p>
          </div>
          <p className="text-lg md:text-xl">{data.content}</p>
        </div>
        <div className="flex gap-4">
          {currentUser._id == data.author._id && (
            <button
              className="border-2 border-indigo-700 hover:border-indigo-500 stroke-2 text-indigo-700 hover:text-indigo-500 
      p-2 rounded-lg flex justify-between outline-none"
              onClick={handleDelete}
            >
              <TrashIcon className="h-6" />
            </button>
          )}
          <button
            className="w-16 border-2 border-indigo-700 hover:border-indigo-500 stroke-2 stroke-indigo-700 hover:stroke-indigo-500 text-indigo-700 hover:text-indigo-500 
      p-2 rounded-lg flex justify-between outline-none"
            onClick={handleLike}
          >
            <p className="pl-1 font-display font-bold">{likeCount}</p>
            <HeartIcon
              className={
                isLiked
                  ? "h-6 text-indigo-700 hover:text-indigo-500"
                  : "h-6 text-white"
              }
            />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Post;
