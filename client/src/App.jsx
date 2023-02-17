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
            <div>
              <Logo styles="m-auto w-24 py-4" />
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
