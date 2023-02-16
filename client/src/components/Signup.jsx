import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../api/auth.js";
import FormInput from "./FormInput.jsx";

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
        <FormInput
          name={"displayName"}
          type={"text"}
          formData={formData}
          setFormData={setFormData}
        />
        <button onClick={handleSubmit}>Sign Up</button>
      </form>
      <p>Have an account already?</p>
      <Link to="/login">Log in here</Link>
    </div>
  );
}

export default Signup;
