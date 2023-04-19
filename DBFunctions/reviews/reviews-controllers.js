import * as reviewsDao from "./reviews-dao.js";

export const ReviewController = (app) => {
  app.get("/reviews", findAllReviews);
  app.get("/reviews/:id", findReviewById);
  app.post("/reviews", createReview);
  app.delete("/reviews/:id", deleteReview);
  app.put("/reviews/:id", updateReview);
};

// Find - all / by id
const findAllReviews = async (req, res) => {
  try {
    const reviews = await reviewsDao.findAllReviews();
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: "An error occurred while fetching reviews." });
  }
};

const findReviewById = async (req, res) => {
  try {
    const idToFind = req.params.id;
    let review = await reviewsDao.findReviewById(idToFind);
    review.viewsAmount = review.viewsAmount + 1;
    await reviewsDao.updateReview(idToFind, review);
    res.json(review);
  } catch (error) {
    res.status(500).json({ message: `An error occurred while fetching the review with ID ${idToFind || 'undefined'}.` });
  }
};

// Create
const createReview = async (req, res) => {
  try {
    const newReview = req.body;
    const insertedReview = await reviewsDao.createReview(newReview);
    res.json(insertedReview);
  } catch (error) {
    res.status(500).json({ message: "An error occurred while creating the review." });
  }
};

// Delete -- return null when unsuccessful
const deleteReview = async (req, res) => {
  try {
    const idToDelete = req.params.id;
    const status = await reviewsDao.deleteReview(idToDelete);
    res.json(status);
  } catch (error) {
    res.status(500).json({ message: `An error occurred while deleting the review with ID ${idToDelete || 'undefined'}.` });
  }
};

// Update
const updateReview = async (req, res) => {
  try {
    const idToUpdate = req.params.id;
    const updatedReview = req.body;
    await reviewsDao.updateReview(idToUpdate, updatedReview);
    const review = await reviewsDao.findReviewById(idToUpdate);
    res.json(review);
  } catch (error) {
    res.status(500).json({ message: `An error occurred while updating the review with ID ${idToUpdate || 'undefined'}.` });
  }
};
