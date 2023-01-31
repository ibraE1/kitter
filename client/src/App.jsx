import { Route, Routes, Navigate } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Timeline from "./components/Timeline";
import Explore from "./components/Explore";
import Profile from "./components/Profile";
import Authentication from "./components/Authentication";

function App() {
  let loggedIn = true;
  return (
    <div className="App">
      {loggedIn ? <Navbar /> : <Authentication />}
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
        {loggedIn && <Route path="/post/timeline" element={<Timeline />} />}
        {loggedIn && <Route path="/post/explore" element={<Explore />} />}
        {loggedIn && <Route path="/user/placeholder" element={<Profile />} />}
        {loggedIn && <Route path="/auth/*" element={<Navigate to="/" />} />}
      </Routes>
    </div>
  );
}

export default App;
