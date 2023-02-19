const getPostById = async (id) => {
  try {
    const response = await fetch("http://localhost:5000/post/" + id, {
      method: "GET",
      credentials: "include",
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

const getAllPosts = async () => {
  try {
    const response = await fetch("http://localhost:5000/post", {
      method: "GET",
      credentials: "include",
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

const createPost = async (postContent) => {
  try {
    const response = await fetch("http://localhost:5000/post", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ content: postContent }),
      credentials: "include",
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

const likePost = async (id) => {
  try {
    const response = await fetch("http://localhost:5000/post/like/" + id, {
      method: "POST",
      credentials: "include",
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

const unlikePost = async (id) => {
  try {
    const response = await fetch("http://localhost:5000/post/unlike/" + id, {
      method: "POST",
      credentials: "include",
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

const deletePost = async (id) => {
  try {
    const response = await fetch("http://localhost:5000/post/" + id, {
      method: "DELETE",
      credentials: "include",
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export {
  getPostById,
  getAllPosts,
  createPost,
  likePost,
  unlikePost,
  deletePost,
};
