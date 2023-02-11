import { Route, Routes, redirect, Navigate } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Timeline from "./components/Timeline";
import Explore from "./components/Explore";
import { useEffect, useState } from "react";
import { verifyLogin } from "./api/auth";
import Signup from "./components/Signup";
import Login from "./components/Login";

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
    <div className="App">
      {isloggedIn === undefined ? (
        <h1>loading</h1>
      ) : (
        <>
          {isloggedIn && <Navbar setIsLoggedIn={setIsLoggedIn} />}
          <Routes>
            {!isloggedIn && (
              <>
                <Route path="/*" element={<Navigate to={"/register"} />} />
                <Route
                  path="/login"
                  element={<Login setIsLoggedIn={setIsLoggedIn} />}
                />
                <Route path="/register" element={<Signup />} />
              </>
            )}
            {isloggedIn && (
              <>
                <Route path="/" element={<Navigate to={"/timeline"} />} />
                <Route path="/timeline" element={<Timeline />} />
                <Route path="/explore" element={<Explore />} />
              </>
            )}
          </Routes>
        </>
      )}
    </div>
  );
}

export default App;
