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

export { getPostById, getAllPosts };
