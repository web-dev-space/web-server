import mongoose from "mongoose";
import groupsSchema from "./groups-schema.js";

const Group = mongoose.model("GroupModel", groupsSchema, "groups");

export default Group;