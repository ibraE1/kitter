import User from "../models/User.js";
import bcrypt from "bcrypt";
import Post from "../models/Post.js";

const getUserByUsername = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username })
      .select("-password")
      .populate("followers")
      .populate("following");

    if (!user) return res.status(400).json("User does not exist");

    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
      .select("-password")
      .populate("followers")
      .populate("following");

    if (!user) return res.status(400).json("User does not exist");

    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

const updateUserInfo = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username });
    if (!user) return res.status(400).json("User does not exist");

    if (user.id != req.userid)
      return res.status(400).json("Not authorized to update this user");

    if (req.body.hasOwnProperty("password")) {
      req.body.password = await bcrypt.hash(await req.body.password, 10);
    }

    await user.updateOne(req.body);
    return res.status(200).json("Updated user " + user.username);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

const deleteUser = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username });
    if (!user) return res.status(400).json("User does not exist");

    if (user.id != req.userid)
      return res.status(400).json("Not authorized to delete this user");

    await Post.deleteMany({ author: user });
    await user.deleteOne();

    res.status(200).json("Deleted user " + user.username);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

export { getUserById, getUserByUsername, updateUserInfo, deleteUser };
