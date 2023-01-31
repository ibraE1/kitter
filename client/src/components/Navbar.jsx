import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div className="Navbar">
      <h1>Title</h1>
      <Link to="/post/timeline">Timeline</Link>
      <Link to="/post/explore">Explore</Link>
      <Link to="/user/placeholder">Profile</Link>
      <button>Log out</button>
    </div>
  );
}

export default Navbar;
