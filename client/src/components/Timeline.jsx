import { useEffect, useState } from "react";
import { getAllPostsByUser } from "../api/user";
import Post from "./Post";

function Timeline({ currentUser }) {
  const [posts, setPosts] = useState();

  useEffect(() => {
    const following = currentUser.following.concat([currentUser]);
    const getPosts = async () => {
      const userPosts = [];
      for (const user of following) {
        userPosts.push(...(await getAllPostsByUser(user.username)));
      }
      setPosts(userPosts);
    };
    getPosts();
  }, []);

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
            Timeline
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

export default Timeline;
