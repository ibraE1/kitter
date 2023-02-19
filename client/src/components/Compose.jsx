import { useState } from "react";
import { createPost } from "../api/post.js";

function Compose() {
  const [postContent, setPostContent] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const post = async () => {
      await createPost(postContent);
    };
    post();
    setPostContent("");
  };

  return (
    <div className="w-screen">
      <form className="flex flex-col justify-center gap-4 items-center h-screen p-8">
        <textarea
          className="w-full h-4/6 resize-none border-2 border-slate-400 placeholder:text-center placeholder-slate-400 focus:border-indigo-700 focus:placeholder-indigo-700 focus:outline-none focus:placeholder-opacity-0 rounded-lg p-3"
          id="text"
          value={postContent}
          placeholder="What would you like to share?"
          onChange={(e) => setPostContent(e.target.value)}
        ></textarea>
        <button
          className="bg-indigo-700 hover:bg-indigo-500 text-white font-bold font-display rounded-full w-2/5 p-4"
          onClick={handleSubmit}
        >
          Post
        </button>
      </form>
    </div>
  );
}

export default Compose;
