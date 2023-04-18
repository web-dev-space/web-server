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
  try {
    const posts = await postsDao.findAllPosts();
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: "An error occurred while fetching posts." });
  }
};

const findPostById = async (req, res) => {
  try {
    const idToFind = req.params.id;
    let post = await postsDao.findPostById(idToFind);
    post.viewsAmount = post.viewsAmount + 1;
    await postsDao.updatePost(idToFind, post);
    res.json(post);
  } catch (error) {
    res.status(500).json({ message: `An error occurred while fetching the post with ID ${idToFind}.` });
  }
};

// Create
const createPost = async (req, res) => {
  try {
    const newPost = req.body;
    const insertedPost = await postsDao.createPost(newPost);
    res.json(insertedPost);
  } catch (error) {
    res.status(500).json({ message: "An error occurred while creating the post." });
  }
};

// Delete -- return null when unsuccessful
const deletePost = async (req, res) => {
  try {
    const idToDelete = req.params.id;
    const status = await postsDao.deletePost(idToDelete);
    res.json(status);
  } catch (error) {
    res.status(500).json({ message: `An error occurred while deleting the post with ID ${idToDelete}.` });
  }
};

// Update
const updatePost = async (req, res) => {
  try {
    const idToUpdate = req.params.id;
    const updatedPost = req.body;
    await postsDao.updatePost(idToUpdate, updatedPost);
    const post = await postsDao.findPostById(idToUpdate);
    res.json(post);
  } catch (error) {
    res.status(500).json({ message: `An error occurred while updating the post with ID ${idToUpdate}.` });
  }
};
