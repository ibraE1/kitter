import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const register = async (req, res) => {
  try {
    if (!req.body.username) {
      return res.status(400).json("Username cannot be empty");
    }
    if (req.body.username.indexOf(" ") >= 0) {
      return res.status(400).json("Username cannot contain spaces");
    }
    if (req.body.username.length < 4 || req.body.username.length > 15) {
      return res.status(400).json("Username must be 4-15 characters");
    }

    if (!req.body.password) {
      return res.status(400).json("Password cannot be empty");
    }
    if (req.body.password.indexOf(" ") >= 0) {
      return res.status(400).json("Password cannot contain spaces");
    }
    if (req.body.password.length < 8) {
      return res.status(400).json("Password must be at least 8 characters");
    }

    let displayName = req.body.displayName || req.body.username;
    displayName = displayName.trim();
    if (displayName.length > 20) {
      return res
        .status(400)
        .json("Display name must be 20 characters or fewer");
    }

    const existingUser = await User.findOne({ username: req.body.username });
    if (existingUser) {
      return res.status(400).json("Username is already taken");
    }

    const hashedPassword = await bcrypt.hash(await req.body.password, 10);
    const newUser = new User({
      username: req.body.username,
      password: hashedPassword,
      displayName: displayName,
    });

    const user = await newUser.save();
    return res.status(200).json(user.id);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

const login = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) return res.status(400).json("Username is not registered");

    if (await bcrypt.compare(req.body.password, user.password)) {
      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
        expiresIn: "24h",
      });

      res.cookie("accessToken", token, {
        maxAge: 24 * 60 * 60 * 1000, //24 hours
        httpOnly: true,
      });

      return res.status(200).json(user.id);
    } else res.status(400).json("Wrong password");
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

const logout = async (req, res) => {
  try {
    res.clearCookie("accessToken", { httpOnly: true });
    return res.status(200).json("Logged Out");
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

const verifyLogin = async (req, res) => {
  try {
    return res.status(200).json(req.userid);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

export { register, login, logout, verifyLogin };
