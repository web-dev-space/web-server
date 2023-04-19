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
    const findByString = parcelsModel.find({ shipGroup: shipGroupId }).exec();

    const objectId = mongoose.Types.ObjectId.isValid(shipGroupId)
        ? new mongoose.Types.ObjectId(shipGroupId)
        : null;

    console.log('objectId: ', objectId);

    if (objectId === null) {
        return await findByString;
    } else {
        const findByObjectId = parcelsModel.find({ shipGroup: objectId }).exec();
        const [resultByString, resultByObjectId] = await Promise.all([findByString, findByObjectId])
        console.log('resultByString: ', resultByString);
        console.log('resultByObjectId: ', resultByObjectId);
        return [...resultByString, ...resultByObjectId];
    }
}


export const findParcelsInShipGroupAndCurrentUser = async (shipGroupId, userEmail) => {
    return await parcelsModel.find({ shipGroup: shipGroupId, user: userEmail }).exec();
};
