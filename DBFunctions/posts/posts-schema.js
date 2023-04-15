const mongoose = require("mongoose");
const { Schema } = mongoose;

const commentSchema = new Schema({
  user: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
    default: Date.now,
  },
  content: {
    type: String,
    required: true,
  },
});

const postSchema = new Schema(
  {
    userId: { type: String, required: true },
    title: { type: String, required: true },
    post: { type: String, required: true },
    image: { type: String, required: true },
    comments: {
      type: [commentSchema],
      required: true,
      default: [],
    },
    viewsAmount: { type: Number, required: true },
    created: { type: Date, required: true },
  },
  { collection: "posts" }
);

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
