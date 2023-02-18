import { Route, Routes, redirect, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Timeline from "./components/Timeline";
import Explore from "./components/Explore";
import { useEffect, useState } from "react";
import { verifyLogin } from "./api/auth";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Logo from "./components/Logo";

function App() {
  const [isloggedIn, setIsLoggedIn] = useState();

  useEffect(() => {
    const verify = async () => {
      const isVerified = await verifyLogin();
      if (isVerified == "Authorized") {
        setIsLoggedIn(true);
        redirect("/timeline");
      } else setIsLoggedIn(false);
    };
    verify();
  }, []);

  return (
    <div className="h-screen bg-indigo-700">
      {isloggedIn === undefined ? (
        <div>Loading...</div>
      ) : (
        <>
          {isloggedIn && <Navbar setIsLoggedIn={setIsLoggedIn} />}
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
            <div>
              <Routes>
                <Route path="/" element={<Navigate to={"/timeline"} />} />
                <Route path="/timeline" element={<Timeline />} />
                <Route path="/explore" element={<Explore />} />
              </Routes>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default App;
