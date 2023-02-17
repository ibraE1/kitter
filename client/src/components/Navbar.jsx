import { Link, useNavigate } from "react-router-dom";
import { logout } from "../api/auth";
import Logo from "./Logo";

function Navbar({ setIsLoggedIn }) {
  const navigate = useNavigate();

  const handleLogout = (e) => {
    e.preventDefault();
    const logoutUser = async () => {
      const data = await logout();
      if (data == "Logged Out") {
        setIsLoggedIn(false);
        navigate("/login");
      }
    };
    logoutUser();
  };

  return (
    <div>
      <div>
        <Logo styles="w-12" />
        <h1>Kitter</h1>
      </div>
      <Link to="/timeline">Timeline</Link>
      <Link to="/explore">Explore</Link>
      <Link to="/user/placeholder">Profile</Link>
      <button onClick={handleLogout}>Log out</button>
    </div>
  );
}

export default Navbar;
