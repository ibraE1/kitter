import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      minLength: 4,
      maxLength: 15,
      unique: [true, "Username already exists"],
      required: [true, "Username cannot be empty"],
    },
    password: {
      type: String,
      minLength: 6,
      required: [true, "Password cannot be empty"],
    },
    displayName: {
      type: String,
      minLength: 1,
      maxLength: 15,
    },
    followers: [String],
    following: [String],
  },
  { timestamps: true }
);

const UserModel = mongoose.model("User", UserSchema);

export default UserModel;
