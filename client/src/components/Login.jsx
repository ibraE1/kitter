import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../api/auth.js";

function Login({ setIsLoggedIn }) {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const loginUser = async () => {
      const userId = await login(formData);
      if (userId) {
        setIsLoggedIn(true);
        navigate("/timeline");
      }
    };
    loginUser();
  };

  return (
    <div className="Signup">
      <h1>Login</h1>
      <form>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          value={formData.username}
          onChange={(e) =>
            setFormData({
              username: e.target.value,
              password: formData.password,
              displayName: formData.displayName,
            })
          }
        ></input>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          value={formData.password}
          onChange={(e) =>
            setFormData({
              username: formData.username,
              password: e.target.value,
              displayName: formData.displayName,
            })
          }
        ></input>
        <button onClick={handleSubmit}>Login</button>
      </form>
      <p>Don't have an account?</p>
      <Link to="/register">Sign up here</Link>
    </div>
  );
}

export default Login;
