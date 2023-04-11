import mongoose from 'mongoose';

const schema = mongoose.Schema({
        trackingNumber: {type: String, required: true},
        picture: {type: String, required: false}, // not required
        name: {type: String, required: true},
        courier: {type: String, required: true},
        user: {type: String, required: true},
        isShipped: {type: Boolean, required: true, default: false},
        isWeighted: {type: Boolean, required: true, default: false},
        weight: { type: Number, required: false }, // not required
        shipGroup:{ type: mongoose.Types.ObjectId, required: false}, // not required
        created: {type: Date, required: true, default: Date.now},
    },
    { versionKey: false },
    {collection: 'parcels'});

export default schema;