import mongoose from "mongoose";

const schema = mongoose.Schema(
  {
    asin: { type: String, required: true },
    user: { type: String, required: true },
    date: { type: Date, required: true },
    content: { type: String, required: true },
    productName: { type: String, required: true },
    productLink: { type: String, required: true },
    productImage: { type: String, required: true },
  },
  { collection: "reviews" }
);

export default schema;
