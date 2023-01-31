import { Link, Route, Routes, Navigate } from "react-router-dom";
import Login from "./Login";
import Signup from "./Signup";

function Authentication() {
  return (
    <div className="Authentication">
      <Routes>
        <Route path="/auth" element={<Navigate to="/auth/register" />} />
        <Route path="/auth/register" element={<Signup />} />
        <Route path="/auth/login" element={<Login />} />
      </Routes>
      <p>Have an account already?</p>
      <Link to="/auth/login">Log in here</Link>
    </div>
  );
}

export default Authentication;
