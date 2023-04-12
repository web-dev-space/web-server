import * as postsDao from "./posts-dao.js";

export const PostController = (app) => {
  app.get("/posts", findAllPosts);
  app.get("/posts/:id", findPostById);
  app.post("/posts", createPost);
  app.delete("/posts/:id", deletePost);
  app.put("/posts/:id", updatePost);
};

// Find - all / by id
const findAllPosts = async (req, res) => {
  const posts = await postsDao.findAllPosts();
  res.json(posts);
};

const findPostById = async (req, res) => {
  const idToFind = req.params.id;
  const post = await postsDao.findPostById(idToFind);
  res.json(post);
};

// Create
const createPost = async (req, res) => {
  const newPost = req.body;
  const insertedPost = await postsDao.createPost(newPost);
  res.json(insertedPost);
};

// Delete -- return null when unsuccessful
const deletePost = async (req, res) => {
  const idToDelete = req.params.id;
  const status = await postsDao.deletePost(idToDelete);
  res.json(status);
};

// Update
const updatePost = async (req, res) => {
  const idToUpdate = req.params.id;
  const updatedPost = req.body;
  const status = await postsDao
    .updatePost(idToUpdate, updatedPost)
    .then(() => postsDao.findPostById(idToUpdate));
  res.json(status);
};
