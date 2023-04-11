import parcelsModel from './parcels-model.js';

export const findAllParcels = () =>
    parcelsModel.find();

export const findParcelById = (id) =>
    parcelsModel.findById(id);

export const findParcelByTrackingNumber = (trackingNumber) =>
    parcelsModel.findOne({ trackingNumber });

export const createParcel = (newParcel) =>
    parcelsModel.create(newParcel);

export const deleteParcel = (id) =>
    parcelsModel.findByIdAndDelete({_id: id});

export const updateParcel = (id, newParcel) =>
    parcelsModel.findByIdAndUpdate({_id: id}, {$set: newParcel})