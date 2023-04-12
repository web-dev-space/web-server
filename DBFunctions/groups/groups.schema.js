import mongoose from "mongoose";

const schema = mongoose.Schema(
  {
    name: { type: String, required: true },
    shipRoute: { type: String, required: true },
    shipEndDate: { type: Date, required: true },
    pickupLocation: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    phaseNumber: { type: Number, required: false },
    trackingNumber: { type: String, required: false },
    leader: { type: String, required: true },
    members: { type: [String], required: true },

  },
  { versionKey: false },
  { collection: "groups" }
);

export default schema;
