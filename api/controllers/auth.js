import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const register = async (req, res) => {
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
};

const login = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) return res.json("Username is not registered");
    if (await bcrypt.compare(req.body.password, user.password)) {
      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
        expiresIn: "24h",
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
};

const logout = async (req, res) => {
  try {
    res.clearCookie("accessToken", { httpOnly: true });
    res.json("Logged Out");
  } catch (error) {
    res.json(error);
  }
};

const verifyLogin = async (req, res) => {
  try {
    res.json({ userId: req.userid, status: "Authorized" });
  } catch (error) {
    res.json(error);
  }
};

export { register, login, logout, verifyLogin };
