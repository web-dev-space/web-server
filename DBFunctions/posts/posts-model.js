import mongoose from "mongoose";
import Post from "./posts-schema.js";

const Post = mongoose.model("PostModel", Post, "posts");

export default Post;
