import mongoose from 'mongoose';
import parcelSchema from './parcels-schema.js';

const Parcel = mongoose.model('ParcelModel', parcelSchema, 'parcels');

export default Parcel;