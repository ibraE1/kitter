import express from "express";
import User from "../models/User.js";

const authRouter = express.Router();

authRouter.post("/register", async (req, res) => {
  const newUser = new User({
    username: req.body.username,
    password: req.body.password,
    displayName: req.body.displayName,
  });
  const user = await newUser.save();
  res.json(user);
});

authRouter.post("/login", async (req, res) => {
  const user = await User.findOne({ username: req.body.username });
  if (!user) return res.json("Username is not registered");
  if (req.body.password == user.password) res.json(user);
  else res.json("Wrong password");
});

export default authRouter;
