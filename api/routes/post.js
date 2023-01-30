import express from "express";
import Post from "../models/Post.js";

const router = express.Router();

// create post
router.post("/", async (req, res) => {
  const newPost = new Post(req.body);
  try {
    const post = await newPost.save();
    res.json(post);
  } catch (error) {
    res.json(error);
  }
});

// get post
router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.json("Post does not exist");
    res.json(post);
  } catch (error) {
    res.json(error);
  }
});

// update post
router.put("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.json("Post does not exist");
    await post.updateOne({ $set: req.body });
    res.json(post);
  } catch (error) {
    res.json(error);
  }
});

// delete post
router.delete("/:id", async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    if (!post) return res.json("Post does not exist");
    res.json(post);
  } catch (error) {
    res.json(error);
  }
});

// get all posts
router.get("/explore", async (req, res) => {
  try {
    const post = await Post.find();
    res.json(post);
  } catch (error) {
    res.json(error);
  }
});

export default router;
