import express from "express";
import User from "../models/User.js";

const userRouter = express.Router();

userRouter.delete("/:username", async (req, res) => {
  const user = await User.findOneAndDelete({ username: req.params.username });
  if (!user) return res.json("User does not exist");
  res.json(user);
});

userRouter.get("/:username", async (req, res) => {
  const user = await User.findOne({ username: req.params.username });
  if (!user) return res.json("User does not exist");
  res.json(user);
});

export default userRouter;
