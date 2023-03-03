import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getUserByUsername } from "../api/user";
import Post from "./Post";
import { getAllPostsByUser } from "../api/user";

function User({ currentUser }) {
  const [user, setUser] = useState();
  const [posts, setPosts] = useState([]);
  const location = useLocation();

  useEffect(() => {
    const username = location.pathname.slice(6);
    const getUser = async (username) => {
      const res = await getUserByUsername(username);
      if (res.status == "200") setUser(await res.json());
      else setUser(null);
    };
    getUser(username);
  }, []);

  useEffect(() => {
    const getPosts = async (username) => {
      setPosts(await getAllPostsByUser(username));
    };
    if (user) {
      getPosts(user.username);
    }
  }, [user]);

  const removePost = async (id) => {
    setPosts(posts.filter((post) => post._id != id));
  };

  return (
    <div className="flex flex-col w-full">
      {user == undefined ? (
        <div>Loading</div>
      ) : (
        <>
          <div className="flex flex-col border-b-2 border-slate-300 w-full p-4">
            <h1 className=" text-indigo-700 text-2xl font-display font-bold">
              {user.displayName}
            </h1>
            <p className="text-xl text-slate-500 font-medium">
              {user.username}
            </p>
            <div className="flex flex-row gap-5 mt-4 text-lg">
              <div>
                <p className="inline font-bold">{user.following.length} </p>
                <p className="inline ">following</p>
              </div>
              <div>
                <p className="inline font-bold">{user.followers.length} </p>
                <p className="inline">
                  {user.followers.length == 1 ? "follower" : "followers"}
                </p>
              </div>
            </div>
          </div>
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

export default User;
