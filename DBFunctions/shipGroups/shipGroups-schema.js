import mongoose from 'mongoose';
import addressSchema from '../address/address-schema.js';
import ParcelModel from '../parcels/parcels-model.js';

const schema = mongoose.Schema({
    name: { type: String, required: true },
    shipRoute: { type: String, required: true },
    shipEndDate: { type: Date, required: true },
    pickupLocation: { type: addressSchema, required: true },
    phoneNumber: { type: String, required: true },
    phaseNumber: { type: Number, required: false },
    trackingNumber: { type: String, required: false },
    leader: { type: String, required: true }, // email
    members: { type: [String], required: true }, // emails
    totalWeight: { type: Number, required: false }, // auto calculated
},
    { versionKey: false },
    { collection: 'shipGroups' }
);


schema.methods.getTotalWeight = async function () {
    const shipGroupId = this._id;

    const result = await ParcelModel.aggregate([
        {
            $match: { shipGroup: mongoose.Types.ObjectId(shipGroupId) },
        },
        {
            $group: {
                _id: null,
                totalWeight: { $sum: '$weight' },
            },
        },
        {
            $project: { _id: 0 },
        },
    ]);

    if (result.length > 0) {
        return result[0].totalWeight;
    } else {
        return 0;
    }
};

export default schema;
