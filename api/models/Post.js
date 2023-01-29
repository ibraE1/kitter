import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
  author: {
    type: String,
    minLength: 4,
    maxLength: 15,
    required: [true, "Post must have an author"],
  },
  content: {
    type: String,
    minLength: 1,
    maxLength: 140,
    required: [true, "Post cannot be empty"],
  },
  likes: {
    type: Number,
    default: 0,
  },
});

const PostModel = mongoose.model("Post", PostSchema);

export default PostModel;
