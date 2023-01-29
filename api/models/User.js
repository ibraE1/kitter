import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    minLength: 4,
    maxLength: 15,
    unique: true,
    required: [true, "Username cannot be empty"],
  },
  password: {
    type: String,
    minLength: 6,
    unique: true,
    required: [true, "Password cannot be empty"],
  },
  followers: [String],
  followings: [String],
  displayName: {
    type: String,
    minLength: 1,
    maxLength: 15,
  },
});

const UserModel = mongoose.model("User", UserSchema);

export default UserModel;
