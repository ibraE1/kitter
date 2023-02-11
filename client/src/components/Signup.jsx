import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../api/auth.js";

function Signup() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    displayName: "",
  });

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const registerUser = async () => {
      const userId = await register(formData);
      console.log(userId);
      navigate("/login");
    };
    registerUser();
  };

  return (
    <div className="Signup">
      <h1>Sign Up</h1>
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
        <label htmlFor="displayName">Display Name</label>
        <input
          type="text"
          id="displayName"
          value={formData.displayName}
          onChange={(e) =>
            setFormData({
              username: formData.username,
              password: formData.password,
              displayName: e.target.value,
            })
          }
        ></input>
        <button onClick={handleSubmit}>Sign Up</button>
      </form>
      <p>Have an account already?</p>
      <Link to="/login">Log in here</Link>
    </div>
  );
}

export default Signup;
