import { useState, useEffect } from "react";
import { getAllPosts } from "../api/post";
import Post from "./Post";

function Explore() {
  const [posts, setPosts] = useState();

  useEffect(() => {
    const getPosts = async () => {
      const posts = await getAllPosts();
      setPosts(posts);
    };
    getPosts();
  }, []);

  return (
    <div className="flex flex-col w-full items-center">
      {posts == undefined ? (
        <div>Loading...</div>
      ) : (
        <>
          <h1 className="border-b-2 border-slate-300 w-full p-4 text-indigo-700 text-xl font-display font-bold">
            Explore
          </h1>
          {posts.map((data) => {
            return <Post key={data} data={data} />;
          })}
        </>
      )}
    </div>
  );
}

export default Explore;
