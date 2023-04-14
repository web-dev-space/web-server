import mongoose from "mongoose";

const schema = mongoose.Schema(
  {
    // required: email, password, name
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },

    // not-required: avatar
    avatar: { type: String, required: false },
    phone: { type: String, required: false },
    address: { type: String, required: false },

    // auto-generated: created
    created: { type: Date, required: true, default: Date.now },

    // role, following, numberShipments, numberParcels
    role: {
      type: String,
      required: true,
      default: "buyer",
      enum: ["admin", "buyer", "merchant"],
    },
    following: { type: Array, required: true, default: [] },
    numberShipments: { type: Number, required: false, default: 0 },
    numberParcels: { type: Number, required: false, default: 0 },
    warehouseAddress: {
      type: String,
      required: true,
      default: "1234 Main St, Guangzhou, Guangdong",
    },
    warehousePhone: {
      type: String,
      required: true,
      default: "13800001234",
    },
    warehouseReceiver: {
      type: String,
      required: true,
      default: "John",
    },
  },
  { versionKey: false },
  { collection: "users" }
);

export default schema;
