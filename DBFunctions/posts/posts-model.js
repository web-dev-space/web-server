import mongoose from "mongoose";
import postSchema from "./posts-schema.js";

const Post = mongoose.model("PostModel", postSchema, "posts");

export default Post;
