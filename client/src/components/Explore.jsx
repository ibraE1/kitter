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
    <div>
      {posts == undefined ? (
        <h1>loading</h1>
      ) : (
        <>
          <h1>Explore</h1>
          {posts.map((data) => {
            return <Post data={data} />;
          })}
        </>
      )}
    </div>
  );
}

export default Explore;
