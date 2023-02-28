const getUserByUsername = async (username) => {
  try {
    const response = await fetch("http://localhost:5000/user/" + username, {
      method: "GET",
      credentials: "include",
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};

const getUserById = async (id) => {
  try {
    const response = await fetch("http://localhost:5000/user/id/" + id, {
      method: "GET",
      credentials: "include",
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};

export { getUserByUsername, getUserById };
