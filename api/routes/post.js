import express from "express";
import Post from "../models/Post.js";
import User from "../models/User.js";
import verifyToken from "../middleware/authMiddleware.js";

const router = express.Router();

// create post
router.post("/", verifyToken, async (req, res) => {
  const newPost = new Post(req.body);
  try {
    const post = await newPost.save();
    res.json(post);
  } catch (error) {
    res.json(error);
  }
});

// get post
router.get("/:id", verifyToken, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.json("Post does not exist");
    res.json(post);
  } catch (error) {
    res.json(error);
  }
});

// update post
router.put("/:id", verifyToken, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.json("Post does not exist");
    const user = await User.findOne({ username: post.author });
    if (user.id != req.body.id)
      return res.json("Not authorized to update this post");
    await post.updateOne({ $set: req.body });
    res.json(post);
  } catch (error) {
    res.json(error);
  }
});

// delete post
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.json("Post does not exist");
    const user = await User.findOne({ username: post.author });
    if (user.id != req.body.id)
      return res.json("Not authorized to delete this post");
    await post.deleteOne();
    res.json(post);
  } catch (error) {
    res.json(error);
  }
});

// get all posts
router.get("/explore", verifyToken, async (req, res) => {
  try {
    const post = await Post.find();
    res.json(post);
  } catch (error) {
    res.json(error);
  }
});

export default router;
