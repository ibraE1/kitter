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
  displayName: {
    type: String,
    minLength: 1,
    maxLength: 15,
    required: [true, "Display name cannot be empty"],
  },
  joinedAt: {
    type: Date,
    default: new Date(),
  },
  followers: [String],
  following: [String],
});

const UserModel = mongoose.model("User", UserSchema);

export default UserModel;
