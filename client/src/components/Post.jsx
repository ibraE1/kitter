import { useEffect, useState } from "react";
import { HeartIcon } from "@heroicons/react/24/solid";
import { getUser } from "../api/user";
import { likePost, unlikePost } from "../api/post";

function Post({ data }) {
  const [likeCount, setLikeCount] = useState(data.likes.length);
  const [user, setUser] = useState({});

  useEffect(() => {
    const fetch = async () => {
      const userData = await getUser(data.author);
      setUser(userData);
    };
    fetch();
  }, []);

  const like = async () => {
    await likePost(data.id);
    setLikeCount(likeCount + 1);
  };

  const unlike = async () => {
    await unlikePost(data.id);
    setLikeCount(likeCount - 1);
  };

  return (
    <div className="flex w-full md:w-2/6 p-3 justify-between items-center border-b-2 border-slate-200">
      <div className="flex flex-col justify-around">
        <div className="flex items-center gap-1">
          <p className="font-bold">{user.displayName}</p>
          <p className="font-black text-slate-500 mb-2">.</p>
          <p className="text-slate-500">{user.displayName}</p>
        </div>
        <p>{data.content}</p>
      </div>
      <button
        className="border-2 border-indigo-700 hover:border-indigo-500 stroke-2 stroke-indigo-700 hover:stroke-indigo-500 text-indigo-700 hover:text-indigo-500 
      p-2 rounded-lg flex gap-2"
      >
        <p className="pl-1 font-display font-bold">{likeCount}</p>
        <HeartIcon className="h-6 text-white" />
      </button>
    </div>
  );
}

export default Post;
