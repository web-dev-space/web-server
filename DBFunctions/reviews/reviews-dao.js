import reviewsModel from "./reviews-model.js";

export const findAllReviews = () => reviewsModel.find();

export const findReviewById = (id) => reviewsModel.findById(id);

export const createReview = (newReview) => reviewsModel.create(newReview);

export const deleteReview = (id) => reviewsModel.findByIdAndDelete({ _id: id });

export const updateReview = (id, newReview) =>
  reviewsModel.findByIdAndUpdate({ _id: id }, { $set: newReview });

export const findReviewsForProject = (projectId) =>
  reviewsModel.find({ asin: projectId });
  