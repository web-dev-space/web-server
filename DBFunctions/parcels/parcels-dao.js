import parcelsModel from './parcels-model.js';
import mongoose from 'mongoose';

export const findAllParcels = () =>
    parcelsModel.find();

export const findParcelById = (id) =>
    parcelsModel.findById(id);

export const findParcelByTrackingNumber = (trackingNumber) =>
    parcelsModel.findOne({ trackingNumber });

export const createParcel = (newParcel) =>
    parcelsModel.create(newParcel);

export const deleteParcel = (id) =>
    parcelsModel.findByIdAndDelete({ _id: id });

export const updateParcel = (id, newParcel) =>
    parcelsModel.findByIdAndUpdate({ _id: id }, { $set: newParcel })

export const countAllParcels = async () => {
    return { totalParcelsNumber: await parcelsModel.countDocuments({}) };
}

export const findParcelsInShipGroup = async (shipGroupId) => {
    const objectId = mongoose.Types.ObjectId.isValid(shipGroupId)
        ? new mongoose.Types.ObjectId(shipGroupId)
        : null;

    const query = {
        shipGroup: { $in: objectId ? [shipGroupId, objectId] : [shipGroupId] },
    };

    return await parcelsModel.find(query).exec();
};

export const findParcelsInShipGroupAndCurrentUser = async (shipGroupId, userEmail) => {
    return await parcelsModel.find({ shipGroup: shipGroupId, user: userEmail }).exec();
};
