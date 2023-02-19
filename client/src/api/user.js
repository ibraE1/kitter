const getUser = async (username) => {
  try {
    const response = await fetch("http://localhost:5000/user/" + username, {
      method: "GET",
      credentials: "include",
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export { getUser };
