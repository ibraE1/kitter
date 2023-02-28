import {
  Route,
  Routes,
  redirect,
  Navigate,
  Link,
  useLocation,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Timeline from "./components/Timeline";
import Explore from "./components/Explore";
import { useEffect, useState } from "react";
import { verifyLogin } from "./api/auth";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Logo from "./components/Logo";
import { PlusCircleIcon } from "@heroicons/react/24/solid";
import Compose from "./components/Compose";
import Profile from "./components/Profile";
import { getUserById } from "./api/user";

function App() {
  const [isloggedIn, setIsLoggedIn] = useState();
  const [currentUserId, setCurrentUserId] = useState();
  const [currentUser, setCurrentUser] = useState({});
  const location = useLocation();

  useEffect(() => {
    const verify = async () => {
      const res = await verifyLogin();
      if (res.status == "200") {
        setIsLoggedIn(true);
        setCurrentUserId(await res.json());
        redirect("/timeline");
      } else {
        setIsLoggedIn(false);
      }
    };
    verify();
  }, []);

  useEffect(() => {
    const getUser = async () => {
      const res = await getUserById(currentUserId);
      if (res.status == "200") setCurrentUser(await res.json());
    };
    if (currentUserId) getUser();
  }, [currentUserId]);

  return (
    <div className="h-screen bg-indigo-700">
      {isloggedIn === undefined ? (
        <div>Loading...</div>
      ) : (
        <>
          {!isloggedIn && (
            <div className="flex flex-col md:flex-row-reverse">
              <div className="flex flex-col py-4 m-auto items-center">
                <Logo styles="w-24 md:w-96" />
                <h1 className="text-center text-white text-4xl md:text-8xl font-black font-display">
                  Kitter
                </h1>
              </div>
              <Routes>
                <Route path="/*" element={<Navigate to={"/register"} />} />
                <Route
                  path="/login"
                  element={<Login setIsLoggedIn={setIsLoggedIn} />}
                />
                <Route path="/register" element={<Signup />} />
              </Routes>
            </div>
          )}
          {isloggedIn && (
            <div className="h-screen bg-white flex md:flex-row justify-start items-stretch md:justify-start">
              <Navbar setIsLoggedIn={setIsLoggedIn} currentUser={currentUser} />
              <Routes>
                <Route path="/" element={<Navigate to={"/timeline"} />} />
                <Route path="/timeline" element={<Timeline />} />
                <Route
                  path="/explore"
                  element={<Explore currentUser={currentUser} />}
                />
                <Route path="/compose" element={<Compose />} />
                <Route path="/profile" element={<Profile />} />
              </Routes>
              <Link
                to="/compose"
                className={
                  location.pathname == "/compose"
                    ? "hidden"
                    : "w-16 text-indigo-700 hover:text-indigo-500 absolute bottom-28 right-4 drop-shadow-xl md:hidden"
                }
              >
                <PlusCircleIcon />
              </Link>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default App;
