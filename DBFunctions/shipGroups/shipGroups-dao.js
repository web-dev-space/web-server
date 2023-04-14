import shipGroupsModel from "./shipGroups-model.js";

export const findAllShipGroups = async () => await shipGroupsModel.find();

export const findShipGroupById = async (id) =>
  await shipGroupsModel.findById(id);

export const findShipGroupByTrackingNumber = async (trackingNumber) =>
  await shipGroupsModel.findOne({ trackingNumber });

export const createShipGroup = async (newShipGroup) =>
  await shipGroupsModel.create(newShipGroup);

export const deleteShipGroup = async (id) =>
  await shipGroupsModel.findByIdAndDelete({ _id: id });

export const updateShipGroup = async (id, newShipGroup) =>
  await shipGroupsModel.findByIdAndUpdate(
    { _id: id },
    { $set: newShipGroup },
    { new: true }
  );

export const countAllShipGroups = async () => {
  return { totalShipGroupsNumber: await shipGroupsModel.countDocuments({}) };
};
