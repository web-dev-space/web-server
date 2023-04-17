import mongoose from 'mongoose';

const schema = mongoose.Schema({
    // required: email, password, name
    name: { type: String, required: true },
    email: { type: String, required: true },
    avatar: { type: String, required: false },
    phone: { type: String, required: false },
    address: { type: String, required: false },

    // auto-generated: created
    created: { type: Date, required: true, default: Date.now },

    // role, blockList
    role: {
        type: String,
        required: true,
        default: "admin",
        enum: ["admin", "buyer", "merchant"],
    },
},
    { versionKey: false },
    { collection: 'users' });

export default schema;
