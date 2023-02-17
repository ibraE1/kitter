import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../api/auth.js";
import FormInput from "./FormInput.jsx";

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
    <div>
      <h1>Login</h1>
      <form>
        <FormInput
          name={"username"}
          type={"text"}
          formData={formData}
          setFormData={setFormData}
        />
        <FormInput
          name={"password"}
          type={"password"}
          formData={formData}
          setFormData={setFormData}
        />
        <button onClick={handleSubmit}>Login</button>
      </form>
      <p>Don't have an account?</p>
      <Link to="/register">Sign up here</Link>
    </div>
  );
}

export default Login;
