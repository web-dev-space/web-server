import mongoose from "mongoose";
import reviewSchema from "./reviews-schema.js";

const Review = mongoose.model("ReviewModel", reviewSchema, "reviews");

export default Review;
