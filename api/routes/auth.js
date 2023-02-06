import express from "express";
import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const router = express.Router();

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
    user.password = null;
    res.json(user.id);
  } catch (error) {
    res.json(error);
  }
});

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) return res.json("Username is not registered");
    if (await bcrypt.compare(req.body.password, user.password)) {
      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
        expiresIn: "15s",
      });
      res.cookie("accessToken", token, {
        maxAge: 24 * 60 * 60 * 1000, //24 hours
        httpOnly: true,
      });
      res.json(user.id);
    } else res.json("Wrong password");
  } catch (error) {
    res.json(error);
  }
});

export default router;
