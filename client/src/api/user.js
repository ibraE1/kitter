const getUserByUsername = async (username) => {
  try {
    const response = await fetch(
      import.meta.env.VITE_API_URL + "/user/" + username,
      {
        method: "GET",
        credentials: "include",
        mode: "cors",
      }
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};

const getUserById = async (id) => {
  try {
    const response = await fetch(
      import.meta.env.VITE_API_URL + "/user/id/" + id,
      {
        method: "GET",
        credentials: "include",
        mode: "cors",
      }
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};

const getAllPostsByUser = async (username) => {
  try {
    const response = await fetch(
      import.meta.env.VITE_API_URL + "/user/" + username + "/posts",
      {
        method: "GET",
        credentials: "include",
        mode: "cors",
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

const followUser = async (username) => {
  try {
    const response = await fetch(
      import.meta.env.VITE_API_URL + "/user/" + username + "/follow",
      {
        method: "PUT",
        credentials: "include",
        mode: "cors",
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

const unfollowUser = async (username) => {
  try {
    const response = await fetch(
      import.meta.env.VITE_API_URL + "/user/" + username + "/follow",
      {
        method: "DELETE",
        credentials: "include",
        mode: "cors",
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export {
  getUserByUsername,
  getUserById,
  getAllPostsByUser,
  followUser,
  unfollowUser,
};
