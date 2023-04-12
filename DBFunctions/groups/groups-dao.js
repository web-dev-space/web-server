import groupsModel from "./groups-model.js";
import parcelsModel from "../parcels/parcels-model.js";

export const findAllGroups = () =>
  groupsModel.find();

export const findGroupById = (id) =>
  groupsModel.findById(id);

export const createGroup = (newGroup) =>
  groupsModel.create(newGroup);

export const deleteGroup = (id) =>
  groupsModel.findByIdAndDelete({_id: id});

export const updateGroup = (id, newGroup) =>
  groupsModel.findByIdAndUpdate({_id: id}, {$set: newGroup});