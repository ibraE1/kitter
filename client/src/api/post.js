const getPostById = async (id) => {
  try {
    const response = await fetch(import.meta.env.VITE_API_URL + "/post/" + id, {
      method: "GET",
      credentials: "include",
      mode: "cors",
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

const getAllPosts = async () => {
  try {
    const response = await fetch(import.meta.env.VITE_API_URL + "/post", {
      method: "GET",
      credentials: "include",
      mode: "cors",
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

const createPost = async (postContent) => {
  try {
    const response = await fetch(import.meta.env.VITE_API_URL + "/post", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ content: postContent }),
      credentials: "include",
      mode: "cors",
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

const likePost = async (id) => {
  try {
    const response = await fetch(
      import.meta.env.VITE_API_URL + "/post/like/" + id,
      {
        method: "POST",
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

const unlikePost = async (id) => {
  try {
    const response = await fetch(
      import.meta.env.VITE_API_URL + "/post/unlike/" + id,
      {
        method: "POST",
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

const deletePost = async (id) => {
  try {
    const response = await fetch(import.meta.env.VITE_API_URL + "/post/" + id, {
      method: "DELETE",
      credentials: "include",
      mode: "cors",
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
