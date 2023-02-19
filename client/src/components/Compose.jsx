import { useState } from "react";
import { createPost } from "../api/post.js";

function Compose() {
  const [postContent, setPostContent] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const post = async () => {
      await createPost(postContent.trim());
    };
    post();
    setPostContent("");
  };

  const handleChange = (e) => {
    setPostContent(e.target.value);
  };

  return (
    <div className="w-screen h-screen">
      <form className="flex flex-col justify-around gap-4 items-center h-[calc(100vh-4rem)] p-8">
        <textarea
          className={
            postContent.length <= 140
              ? "w-full h-4/5 resize-none border-2 border-slate-400 placeholder:text-center placeholder-slate-400 focus:border-indigo-700 focus:placeholder-indigo-700 focus:outline-none focus:placeholder-opacity-0 rounded-lg p-3"
              : "w-full h-4/5 resize-none border-2 border-red-500 placeholder:text-center placeholder-slate-400 focus:border-red-600 focus:outline-none focus:placeholder-opacity-0 rounded-lg p-3"
          }
          id="text"
          value={postContent}
          placeholder="What would you like to share?"
          onChange={handleChange}
        ></textarea>
        <div className="w-full flex justify-between items-center p-2">
          <p
            className={
              postContent.length > 140
                ? "font-display font-medium text-red-600"
                : "font-display font-medium"
            }
          >
            {postContent.length}/140
          </p>
          <button
            className="bg-indigo-700 hover:bg-indigo-500 text-white font-bold font-display rounded-full w-2/5 p-4 disabled:bg-indigo-300"
            onClick={handleSubmit}
            disabled={postContent.length > 140 || postContent.trim() == ""}
          >
            Post
          </button>
        </div>
      </form>
    </div>
  );
}

export default Compose;
