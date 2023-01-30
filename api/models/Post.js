import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
  author: String,
  content: {
    type: String,
    minLength: 1,
    maxLength: 140,
    required: [true, "Post cannot be empty"],
  },
  likes: [String],
  postedAt: {
    type: Date,
    default: new Date(),
  },
});

const PostModel = mongoose.model("Post", PostSchema);

export default PostModel;
