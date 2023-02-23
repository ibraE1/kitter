import express from "express";
import verifyToken from "../middleware/authMiddleware.js";
import {
  createPost,
  getPostById,
  editPost,
  deletePost,
  getAllPosts,
  likePost,
  unlikePost,
} from "../controllers/post.js";

const router = express.Router();

// create post
router.post("/", verifyToken, createPost);

// get post
router.get("/:id", verifyToken, getPostById);

// edit post
router.put("/:id", verifyToken, editPost);

// delete post
router.delete("/:id", verifyToken, deletePost);

// like post
router.put("/:id/like", verifyToken, likePost);

// unlike post
router.delete("/:id/like", verifyToken, unlikePost);

// get all posts
router.get("/", verifyToken, getAllPosts);

export default router;
