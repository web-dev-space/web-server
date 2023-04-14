import mongoose from 'mongoose';

const schema = mongoose.Schema({
        receiver: { type: String, required: true },
        phoneNumber: { type: String, required: true },
        street: { type: String, required: true },
        city: { type: String, required: true },
        province: { type: String, required: true },

        // belongings
        company: { type: String, required: true },

        // not required - for further usage
        country: { type: String, required: false },
        postalCode: { type: String, required: false },
    },
    { versionKey: false },
    { collection: 'address' }
);

export default schema;