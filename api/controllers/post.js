import Post from "../models/Post.js";
import User from "../models/User.js";

const createPost = async (req, res) => {
  try {
    const user = await User.findById(req.userid);

    const newPost = new Post({
      author: user,
      content: req.body.content,
    });

    const post = await newPost.save();
    return res.status(200).json(post);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

const getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
      .populate("author")
      .populate("likes");
    if (!post) return res.status(400).json("Post does not exist");

    return res.status(200).json(post);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

const editPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(400).json("Post does not exist");

    const user = await User.findOne(post.author);
    if (user._id != req.userid)
      return res.status(400).json("Not authorized to update this post");

    await post.updateOne({ $set: req.body });
    return res.status(200).json("Edited Post");
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

const likePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(400).json("Post does not exist");

    if (post.likes.includes(req.userid))
      return res.status(400).json("Already liked this post");

    await post.updateOne({ $push: { likes: req.userid } });
    return res.status(200).json("Liked post");
  } catch (error) {
    console.log(error.message);
    return res.status(500).json(error.message);
  }
};

const unlikePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(400).json("Post does not exist");

    if (!post.likes.includes(req.userid))
      return res.status(400).json("Post is not liked");

    await post.updateOne({ $pull: { likes: req.userid } });
    return res.status(200).json("Unliked post");
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(400).json("Post does not exist");

    if (post.author._id != req.userid)
      return res.status(400).json("Not authorized to delete this post");

    await post.deleteOne();
    return res.status(200).json(post);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate("author").populate("likes");
    return res.status(200).json(posts);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

const getAllPostsByUser = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username });
    if (!user) return res.status(400).json("User does not exist");

    const posts = await Post.find({ author: user })
      .populate("author")
      .populate("likes");
    return res.status(200).json(posts);
  } catch (error) {
    return res.status(500).json(error.message);
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
  getAllPostsByUser,
};
