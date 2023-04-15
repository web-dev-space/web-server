import mongoose from "mongoose";

const schema = mongoose.Schema(
  {
    userId: { type: String, required: true },
    title: { type: String, required: true },
    post: { type: String, required: true },
    image: { type: String, required: true },
    comments: {
      type: [{ user: String, date: Date, content: String }],
      required: true,
    },
    viewsAmount: { type: Number, required: true },
    created: { type: Date, required: true },
  },
  { collection: "posts" }
);

export default schema;
