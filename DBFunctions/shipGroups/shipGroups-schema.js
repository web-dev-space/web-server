import mongoose from 'mongoose';
import addressSchema from '../address/address-schema.js';

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
},
    { versionKey: false },
    { collection: 'shipGroups' });

export default schema;
