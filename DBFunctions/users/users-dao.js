import { buyerModel, merchantModel, adminModel } from './users-model.js';

export const findAllUsers = async () => {
    const buyers = await findAllBuyers().exec();
    const merchants = await findAllMerchants().exec();
    const admins = await findAllAdmins().exec();
    return [...buyers, ...merchants, ...admins];
}

export const findUserById =  async (id) => {
    const buyer = await findBuyerById(id).exec();
    const merchant = await findMerchantById(id).exec();
    const admin = await findAdminById(id).exec();
    return buyer || merchant || admin;
}

export const findUserByEmail = async (email) => {
    const buyer = await findBuyerByEmail(email).exec();
    const merchant = await findMerchantByEmail(email).exec();
    const admin = await findAdminByEmail(email).exec();
    return buyer || merchant || admin;
}

// Buyer
export const findAllBuyers= () =>
    buyerModel.find().where('role').equals('buyer');

export const findBuyerById = (id) =>
    buyerModel.findById(id);

export const findBuyerByEmail = (email) =>
    buyerModel.find().where('email').equals(email);

export const createBuyer = (newBuyer) =>
    buyerModel.create(newBuyer);

export const deleteBuyer = (id) =>
    buyerModel.findByIdAndDelete({_id: id})

export const updateBuyer = (id, newBuyer) =>
    buyerModel.findByIdAndUpdate({_id: id}, {$set: newBuyer});


// Merchant
export const findAllMerchants = () =>
    merchantModel.find().where('role').equals('merchant');

export const findMerchantById = (id) =>
    merchantModel.findById(id);

export const findMerchantByEmail = (email) =>
    merchantModel.find().where('email').equals(email);

export const createMerchant = (newMerchant) =>
    merchantModel.create(newMerchant);

export const deleteMerchant = (id) =>
    merchantModel.findByIdAndDelete({_id: id})

export const updateMerchant = (id, newMerchant) =>
    merchantModel.findByIdAndUpdate({_id: id}, {$set: newMerchant})


// Admin
export const findAllAdmins = () =>
    adminModel.find().where('role').equals('admin');

export const findAdminById = (id) =>
    adminModel.findById(id);

export const findAdminByEmail = (email) =>
    adminModel.find().where('email').equals(email);

export const createAdmin = (newAdmin) =>
    adminModel.create(newAdmin);

export const deleteAdmin = (id) =>
    adminModel.findByIdAndDelete({_id: id})

export const updateAdmin = (id, newAdmin) =>
    adminModel.findByIdAndUpdate({_id: id}, {$set: newAdmin})
