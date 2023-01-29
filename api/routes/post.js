import express from "express";
import Post from "../models/Post.js";

const postRouter = express.Router();

postRouter.post("/", async (req, res) => {
  const newPost = new Post({
    author: req.body.author,
    content: req.body.content,
  });
  const post = await newPost.save();
  res.json(post);
});

postRouter.delete("/:id", async (req, res) => {
  const post = await Post.findOneAndDelete({ id: req.params.id });
  if (!post) return res.json("Post does not exist");
  res.json(post);
});

postRouter.get("/", async (req, res) => {
  const post = await Post.find();
  res.json(post);
});

postRouter.get("/:id", async (req, res) => {
  const post = await Post.findOne({ id: req.params.id });
  if (!post) return res.json("Post does not exist");
  res.json(post);
});

export default postRouter;
