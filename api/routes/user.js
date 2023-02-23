import express from "express";
import verifyToken from "../middleware/authMiddleware.js";
import {
  deleteUser,
  getUserByUsername,
  updateUserInfo,
} from "../controllers/user.js";
import { getAllPostsByUser } from "../controllers/post.js";

const router = express.Router();

// create user in auth.js

// get user
router.get("/:username", verifyToken, getUserByUsername);

// get posts by user
router.get("/:username/posts", verifyToken, getAllPostsByUser);

// update user info
router.put("/:username", verifyToken, updateUserInfo);

// delete user
router.delete("/:username", verifyToken, deleteUser);

export default router;
