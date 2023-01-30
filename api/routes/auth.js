import express from "express";
import User from "../models/User.js";

const router = express.Router();

// create user
router.post("/register", async (req, res) => {
  const newUser = new User(req.body);
  try {
    const user = await newUser.save();
    res.json(user);
  } catch (error) {
    res.json(error);
  }
});

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) return res.json("Username is not registered");
    req.body.password == user.password
      ? res.json(user)
      : res.json("Wrong password");
  } catch (error) {
    res.json(error);
  }
});

export default router;
