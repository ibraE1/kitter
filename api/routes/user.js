import express from "express";
import verifyToken from "../middleware/authMiddleware.js";
import User from "../models/User.js";
import bcrypt from "bcrypt";

const router = express.Router();

// create user in auth.js

// get user
router.get("/:username", verifyToken, async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username }).select(
      "-password"
    );
    if (!user) return res.json("User does not exist");
    res.json(user);
  } catch (error) {
    res.json(error);
  }
});

// update user
router.put("/:username", verifyToken, async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username });
    if (!user) return res.json("User does not exist");
    if (user.id != req.body.id)
      return res.json("Not authorized to update this user");
    if (req.body.hasOwnProperty("password")) {
      req.body.password = await bcrypt.hash(await req.body.password, 10);
    }
    await user.updateOne(req.body);
    user.password = null;
    res.json(user);
  } catch (error) {
    res.json(error);
  }
});

// delete user
router.delete("/:username", verifyToken, async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username }).select(
      "-password"
    );
    if (!user) return res.json("User does not exist");
    if (user.id != req.body.id)
      return res.json("Not authorized to delete this user");
    await user.deleteOne();
    res.json(user);
  } catch (error) {
    res.json(error);
  }
});

export default router;
