import User from "../models/User.js";
import bcrypt from "bcrypt";

const getUserByUsername = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username }).select(
      "-password"
    );
    if (!user) return res.json("User does not exist");
    res.json(user);
  } catch (error) {
    res.json(error);
  }
};

const updateUserInfo = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username });
    if (!user) return res.json("User does not exist");
    if (user.id != req.userid)
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
};

const deleteUser = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username }).select(
      "-password"
    );
    if (!user) return res.json("User does not exist");
    if (user.id != req.userid)
      return res.json("Not authorized to delete this user");
    await user.deleteOne();
    res.json(user);
  } catch (error) {
    res.json(error);
  }
};

export { getUserByUsername, updateUserInfo, deleteUser };
