import Post from "./Post";

function Profile() {
  return (
    <div className="Profile">
      <div>
        <h1>User</h1>
        <p>followers</p>
        <p>following</p>
        <button>Follow</button>
      </div>
      <Post />
      <Post />
      <Post />
      <Post />
      <Post />
    </div>
  );
}

export default Profile;
