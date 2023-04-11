import shipGroupsModel from './shipGroups-model.js';

export const findAllShipGroups = () =>
    shipGroupsModel.find();

export const findShipGroupById = (id) =>
    shipGroupsModel.findById(id);

export const findShipGroupByTrackingNumber = (trackingNumber) =>
    shipGroupsModel.findOne({ trackingNumber });

export const createShipGroup = (newShipGroup) =>
    shipGroupsModel.create(newShipGroup);

export const deleteShipGroup = (id) =>
    shipGroupsModel.findByIdAndDelete({_id: id});

export const updateShipGroup = (id, newShipGroup) =>
    shipGroupsModel.findByIdAndUpdate({_id: id}, {$set: newShipGroup})
    