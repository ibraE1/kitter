import { useEffect, useState } from "react";
import { HeartIcon } from "@heroicons/react/24/solid";
import { getUser } from "../api/user";
import { likePost, unlikePost } from "../api/post";

function Post({ data, currentUser }) {
  const [likeCount, setLikeCount] = useState(data.likes.length);
  const [user, setUser] = useState({});
  const [isLiked, setIsLiked] = useState(data.likes.includes(currentUser));

  useEffect(() => {
    const fetch = async () => {
      const userData = await getUser(data.author);
      setUser(userData);
    };
    fetch();
  }, []);

  const like = async () => {
    await likePost(data._id);
    setLikeCount(likeCount + 1);
  };

  const unlike = async () => {
    await unlikePost(data._id);
    setLikeCount(likeCount - 1);
  };

  const handleClick = async () => {
    if (isLiked) {
      setIsLiked(false);
      unlike();
    } else {
      setIsLiked(true);
      like();
    }
  };

  return (
    <div className="w-full border-b-2 border-slate-200">
      <div className="flex w-full md:w-2/5 p-3 gap-3 justify-between items-center ">
        <div className="flex flex-col justify-around">
          <div className="flex items-center gap-1 text-lg md:text-xl">
            <p className="font-bold">{user.displayName}</p>
            <p className="font-black text-slate-500 mb-2">.</p>
            <p className="text-slate-500">{user.displayName}</p>
          </div>
          <p className="text-lg md:text-xl">{data.content}</p>
        </div>
        <button
          className="w-16 border-2 border-indigo-700 hover:border-indigo-500 stroke-2 stroke-indigo-700 hover:stroke-indigo-500 text-indigo-700 hover:text-indigo-500 
      p-2 rounded-lg flex justify-between outline-none"
          onClick={handleClick}
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
  );
}

export default Post;
