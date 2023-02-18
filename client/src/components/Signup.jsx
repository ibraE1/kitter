import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../api/auth.js";
import FormInput from "./FormInput.jsx";
import Logo from "./Logo";

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
    <div
      className="flex flex-col justify-between items-stretch h-[calc(100vh-8rem)] bg-white rounded-t-3xl px-12 pt-10 pb-12
    md:rounded-r-3xl md:rounded-l-none md:h-screen md:w-6/12"
    >
      <h1 className="text-center text-indigo-700 text-3xl font-black italic font-display mb-4">
        Welcome!
      </h1>
      <p className="text-center text-slate-700 font-medium text-lg">
        Create an account and get started
      </p>
      <form className="flex flex-col justify-evenly items-center h-4/6">
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
        <button
          className="bg-indigo-700 hover:bg-indigo-500 text-white font-bold font-display rounded-full w-4/5 p-4"
          onClick={handleSubmit}
        >
          Sign Up
        </button>
      </form>
      <div>
        <p className="text-center text-slate-700 font-medium text-xl">
          Have an account already?
        </p>
        <Link to="/login">
          <p className="text-center text-indigo-700 underline font-semibold italic font-display text-lg">
            Log in here
          </p>
        </Link>
      </div>
    </div>
  );
}

export default Signup;
