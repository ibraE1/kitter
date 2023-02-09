import { Route, Routes, Navigate } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Timeline from "./components/Timeline";
import Explore from "./components/Explore";
import Profile from "./components/Profile";
import Authentication from "./components/Authentication";
import { useState } from "react";

function App() {
  const [loggedIn, setLoggedIn] = useState();
  return (
    <div className="App">
      {loggedIn ? <Navbar /> : <Authentication setLoggedIn={setLoggedIn} />}
      <Routes>
        <Route
          path="/"
          element={
            loggedIn ? (
              <Navigate to="/post/timeline" />
            ) : (
              <Navigate to="/auth/register" />
            )
          }
        />
        {loggedIn && (
          <>
            <Route path="/post/timeline" element={<Timeline />} />
            <Route path="/post/explore" element={<Explore />} />
            <Route path="/user/placeholder" element={<Profile />} />
            <Route path="/auth/*" element={<Navigate to="/" />} />
          </>
        )}
      </Routes>
    </div>
  );
}

export default App;
