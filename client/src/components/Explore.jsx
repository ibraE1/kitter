import { useState, useEffect } from "react";
import { getAllPosts } from "../api/post";
import Post from "./Post";
import { useLocation } from "react-router-dom";

function Explore({ currentUser }) {
  const [posts, setPosts] = useState();
  const location = useLocation();

  useEffect(() => {
    const getPosts = async () => {
      const posts = await getAllPosts();
      setPosts(posts);
    };
    getPosts();
  }, [location]);

  const removePost = async (id) => {
    setPosts(posts.filter((post) => post._id != id));
  };

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
            return (
              <Post
                key={data._id}
                currentUser={currentUser}
                removePost={removePost}
                data={data}
              />
            );
          })}
        </>
      )}
    </div>
  );
}

export default Explore;
