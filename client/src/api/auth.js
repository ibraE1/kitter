const register = async (formData) => {
  try {
    const response = await fetch("http://localhost:5000/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};

const login = async (formData) => {
  try {
    const response = await fetch("http://localhost:5000/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
      credentials: "include",
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};

const verifyLogin = async () => {
  try {
    const response = await fetch("http://localhost:5000/auth/verifyLogin", {
      method: "GET",
      credentials: "include",
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};

const logout = async () => {
  try {
    const response = await fetch("http://localhost:5000/auth/logout", {
      method: "POST",
      credentials: "include",
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};
export { login, register, verifyLogin, logout };
