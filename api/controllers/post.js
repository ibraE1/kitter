import Post from "../models/Post.js";
import User from "../models/User.js";

const createPost = async (req, res) => {
  const newPost = new Post(req.body);
  try {
    const post = await newPost.save();
    res.json(post);
  } catch (error) {
    res.json(error);
  }
};

const getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.json("Post does not exist");
    res.json(post);
  } catch (error) {
    res.json(error);
  }
};

const editPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.json("Post does not exist");
    const user = await User.findOne({ username: post.author });
    if (user.id != req.userid)
      return res.json("Not authorized to update this post");
    await post.updateOne({ $set: req.body });
    res.json(post);
  } catch (error) {
    res.json(error);
  }
};

const likePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.json("Post does not exist");
    if (post.likes.includes(req.userid))
      return res.json("Already liked this post");
    await post.updateOne({ $push: { likes: req.userid } });
    res.json(post);
  } catch (error) {
    res.json(error);
  }
};

const unlikePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.json("Post does not exist");
    if (!post.likes.includes(req.userid)) return res.json("Post is not liked");
    await post.updateOne({ $pull: { likes: req.userid } });
    res.json(post);
  } catch (error) {
    res.json(error);
  }
};

const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.json("Post does not exist");
    const user = await User.findOne({ username: post.author });
    if (user.id != req.userid)
      return res.json("Not authorized to delete this post");
    await post.deleteOne();
    res.json(post);
  } catch (error) {
    res.json(error);
  }
};

const getAllPosts = async (req, res) => {
  try {
    const post = await Post.find();
    res.json(post);
  } catch (error) {
    res.json(error);
  }
};

export {
  createPost,
  getPostById,
  editPost,
  deletePost,
  getAllPosts,
  likePost,
  unlikePost,
};