import mongoose from 'mongoose';
import adminSchema from "./admin-schema.js";
import merchantSchema from "./merchant-schema.js";
import buyerSchema from "./buyer-schema.js";
import userSchema from "./user-schema.js";


export const adminModel = mongoose.model('AdminModel', adminSchema, 'users');
export const merchantModel = mongoose.model('MerchantModel', merchantSchema, 'users');
export const buyerModel = mongoose.model('BuyerModel', buyerSchema, 'users');
export const userModel = mongoose.model('UserModel', userSchema, 'users');
