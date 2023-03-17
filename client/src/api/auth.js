const register = async (formData) => {
  try {
    const response = await fetch(
      import.meta.env.VITE_API_URL + "/auth/register",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      }
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};

const login = async (formData) => {
  try {
    const response = await fetch(import.meta.env.VITE_API_URL + "/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
      credentials: "include",
      mode: "cors",
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};

const verifyLogin = async () => {
  try {
    const response = await fetch(
      import.meta.env.VITE_API_URL + "/auth/verifyLogin",
      {
        method: "POST",
        credentials: "include",
        mode: "cors",
      }
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};

const logout = async () => {
  try {
    const response = await fetch(
      import.meta.env.VITE_API_URL + "/auth/logout",
      {
        method: "POST",
        credentials: "include",
        mode: "cors",
      }
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};
export { login, register, verifyLogin, logout };
