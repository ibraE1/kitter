import express from "express";
import verifyToken from "../middleware/authMiddleware.js";
import {
  deleteUser,
  followUser,
  getUserById,
  getUserByUsername,
  unfollowUser,
  updateUserInfo,
} from "../controllers/user.js";
import { getAllPostsByUser } from "../controllers/post.js";

const router = express.Router();

// create user in auth.js

// get user by username
router.get("/:username", verifyToken, getUserByUsername);

// get user by id
router.get("/id/:id", verifyToken, getUserById);

// get posts by user
router.get("/:username/posts", verifyToken, getAllPostsByUser);

// update user info
router.put("/:username", verifyToken, updateUserInfo);

// follow user
router.put("/:username/follow", verifyToken, followUser);

// unfollow user
router.delete("/:username/follow", verifyToken, unfollowUser);

// delete user
router.delete("/:username", verifyToken, deleteUser);

export default router;
