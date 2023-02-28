import { Link, useNavigate } from "react-router-dom";
import { logout } from "../api/auth";
import Logo from "./Logo";
import {
  HomeIcon,
  GlobeAltIcon,
  ArrowLeftOnRectangleIcon,
  UserCircleIcon,
} from "@heroicons/react/24/solid";

function Navbar({ setIsLoggedIn, currentUser }) {
  const navigate = useNavigate();

  const handleLogout = (e) => {
    e.preventDefault();
    const logoutUser = async () => {
      const response = await logout();
      if (response.status == "200") {
        setIsLoggedIn(false);
        navigate("/login");
      }
    };
    logoutUser();
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div
      className="fixed bottom-0 w-full flex flex-row justify-between items-center border-t-2 border-slate-300 p-5
    md:static md:w-3/12 md:flex-col md:justify-start md:items-start md:gap-8 md:p-7 md:border-t-0 md:border-r-2"
    >
      <Link
        to="/timeline"
        className="text-indigo-700 hover:text-indigo-500 flex gap-4 items-center"
      >
        <HomeIcon className="h-10 md:h-7" />
        <p className="hidden md:block text-xl text-black font-medium">
          Timeline
        </p>
      </Link>
      <Link
        to="/explore"
        className="text-indigo-700 hover:text-indigo-500 flex gap-4 items-center"
      >
        <GlobeAltIcon className="h-10 md:h-7" />
        <p className="hidden md:block text-xl text-black font-medium">
          Explore
        </p>
      </Link>
      <button
        onClick={scrollToTop}
        className="text-indigo-700 flex gap-4 items-center md:-order-1"
      >
        <Logo styles="h-10 md:h-7" />
        <h1 className="hidden md:block text-xl font-black font-display">
          Kitter
        </h1>
      </button>
      <Link
        to="/profile"
        className="text-indigo-700 hover:text-indigo-500 flex gap-4 items-center"
      >
        <UserCircleIcon className="h-10 md:h-7" />
        <p className="hidden md:block text-xl text-black font-medium">
          {currentUser.username}
        </p>
      </Link>
      <button
        onClick={handleLogout}
        className="text-indigo-700 hover:text-indigo-500 flex gap-4 items-center"
      >
        <ArrowLeftOnRectangleIcon className="h-10 md:h-7" />
        <p className="hidden md:block text-xl text-black font-medium">Logout</p>
      </button>
      <Link
        to="/compose"
        className="hidden md:flex items-center bg-indigo-700 hover:bg-indigo-500 text-white font-bold font-display rounded-full text-center h-10 whitespace-nowrap w-fit p-5"
      >
        New Post
      </Link>
    </div>
  );
}

export default Navbar;
