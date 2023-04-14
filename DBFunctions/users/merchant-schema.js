import mongoose from 'mongoose';

const schema = mongoose.Schema({
        // required: email, password, name
        name: {type: String, required: true},
        email: {type: String, required: true},
        password: {type: String, required: true},
        company: {type: String, required: true},

        // not-required: avatar
        avatar: {type: String, required: false},
        phone: {type: String, required: false},
        address: {type: String, required: false},

        // auto-generated: created
        created: {type: Date, required: true, default: Date.now},

        // role, totalShipments, totalParcels
        role: {type: String,
            required: true,
            default: "merchant",
            enum: ["admin", "buyer", "merchant"],
        },
        totalShipments: {type: Number, required: false, default: 0},
        totalParcels: {type: Number, required: false, default: 0},
    },
    { versionKey: false },
    {collection: 'users'});

export default schema;