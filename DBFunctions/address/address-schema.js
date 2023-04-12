import mongoose from 'mongoose';

const schema = mongoose.Schema({
    name: { type: String, required: true },
    address: { type: String, required: true },
    notes: { type: String, required: false }, // not required
    geoLatitude: { type: Number, required: false },
    geoLongitude: { type: Number, required: false },
    shortAddress: { type: String, required: false },
},
    { versionKey: false },
    { collection: 'address' }
);

export default schema;
