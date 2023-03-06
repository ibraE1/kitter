import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { followUser, getUserByUsername, unfollowUser } from "../api/user";
import Post from "./Post";
import { getAllPostsByUser } from "../api/user";

function User({ currentUser }) {
  const [user, setUser] = useState();
  const [isFollowed, setIsFollowed] = useState();
  const [followerCount, setFollowerCount] = useState();
  const [posts, setPosts] = useState([]);
  const location = useLocation();

  useEffect(() => {
    const username = location.pathname.slice(6);
    const getUser = async (username) => {
      const res = await getUserByUsername(username);
      if (res.status == "200") {
        const resUser = await res.json();
        setUser(resUser);
        setIsFollowed(
          resUser.followers.some((follower) => follower._id == currentUser._id)
        );
        setFollowerCount(resUser.followers.length);
      } else setUser(null);
    };
    getUser(username);
  }, [location]);

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

  const follow = async () => {
    setFollowerCount((prevCount) => prevCount + 1);
    await followUser(user.username);
  };

  const unfollow = async () => {
    setFollowerCount((prevCount) => prevCount - 1);
    await unfollowUser(user.username);
  };

  const handleFollow = async () => {
    if (isFollowed) {
      setIsFollowed(false);
      unfollow();
    } else {
      setIsFollowed(true);
      follow();
    }
  };

  return (
    <div className="flex flex-col w-full">
      {user == undefined ? (
        <div>Loading</div>
      ) : (
        <>
          <div className="flex flex-col border-b-2 border-slate-300 w-full p-4 justify-around gap-3">
            <h1 className=" text-indigo-700 text-2xl font-display font-bold">
              {user.displayName}
            </h1>
            <p className="text-xl text-slate-500 font-medium">
              {user.username}
            </p>
            <div className="flex flex-row gap-5 text-lg">
              <div>
                <p className="inline font-bold">{user.following.length} </p>
                <p className="inline ">following</p>
              </div>
              <div>
                <p className="inline font-bold">{followerCount} </p>
                <p className="inline">
                  {followerCount == 1 ? "follower" : "followers"}
                </p>
              </div>
            </div>
            {user._id != currentUser._id && (
              <button
                className="w-24 border-2 font-display text-md font-semibold border-indigo-700 hover:border-indigo-500 text-indigo-700 hover:text-indigo-500 
              p-2 rounded-lg outline-none"
                onClick={handleFollow}
              >
                {isFollowed ? "unfollow" : "follow"}
              </button>
            )}
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
