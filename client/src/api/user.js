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

const getAllPostsByUser = async (username) => {
  try {
    const response = await fetch(
      "http://localhost:5000/user/" + username + "/posts",
      {
        method: "GET",
        credentials: "include",
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
      "http://localhost:5000/user/" + username + "/follow",
      {
        method: "PUT",
        credentials: "include",
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
      "http://localhost:5000/user/" + username + "/follow",
      {
        method: "DELETE",
        credentials: "include",
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
