import express from "express";
import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const router = express.Router();

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "24h" });
};
// create user
router.post("/register", async (req, res) => {
  const hashedPassword = await bcrypt.hash(await req.body.password, 10);
  const newUser = new User({
    username: req.body.username,
    password: hashedPassword,
    displayName: req.body.displayName || req.body.username,
  });
  try {
    const user = await newUser.save();
    res.json(generateToken(user.id));
  } catch (error) {
    res.json(error);
  }
});

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) return res.json("Username is not registered");
    if (await bcrypt.compare(req.body.password, user.password)) {
      res.json(generateToken(user.id));
    } else res.json("Wrong password");
  } catch (error) {
    res.json(error);
  }
});

export default router;
