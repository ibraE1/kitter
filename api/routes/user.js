import express from "express";
import User from "../models/User.js";

const router = express.Router();

// create user in auth.js

// get user
router.get("/:username", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username });
    if (!user) return res.json("User does not exist");
    res.json(user);
  } catch (error) {
    res.json(error);
  }
});

// update user
router.put("/:username", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.json("User does not exist");
    await user.updateOne({ $set: req.body });
    res.json(user);
  } catch (error) {
    res.json(error);
  }
});

// delete user
router.delete("/:username", async (req, res) => {
  try {
    const user = await User.findOneAndDelete({ username: req.params.username });
    if (!user) return res.json("User does not exist");
    res.json(user);
  } catch (error) {
    res.json(error);
  }
});

export default router;
