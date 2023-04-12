import postsModel from "./posts-model.js";

export const findAllPosts = () => postsModel.find();

export const findPostById = (id) => postsModel.findById(id);

export const createPost = (newPost) => postsModel.create(newPost);

export const deletePost = (id) => postsModel.findByIdAndDelete({ _id: id });

export const updatePost = (id, newPost) =>
  postsModel.findByIdAndUpdate({ _id: id }, { $set: newPost });
