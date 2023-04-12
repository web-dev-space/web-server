import mongoose from "mongoose";
import postsSchema from "./posts-schema.js";

const Post = mongoose.model("PostModel", postSchema, "posts");

export default Post;
