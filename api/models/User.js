import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  username: {
    String,
    minLength: 4,
    maxLength: 15,
    unique: true,
    required: [true, "Username cannot be empty"],
  },
  password: {
    String,
    minLength: 6,
    unique: true,
    required: [true, "Password cannot be empty"],
  },
  followers: [String],
  followings: [String],
  displayName: {
    String,
    minLength: 1,
    maxLength: 15,
  },
  bio: {
    String,
    maxLength: 50,
  },
});

export default UserModel = mongoose.model("User", UserSchema);
