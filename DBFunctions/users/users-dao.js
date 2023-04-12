import { buyerModel, merchantModel, adminModel } from './users-model.js';

export const findAllUsers = () => {
    const buyers = findAllBuyers();
    const merchants = findAllMerchants();
    const admins = findAllAdmins();
    return [...buyers, ...merchants, ...admins];
}

export const findUserById = (id) => {
    const buyer = findBuyerById(id);
    const merchant = findMerchantById(id);
    const admin = findAdminById(id);
    return buyer || merchant || admin;
}

export const findUserByEmail = (email) => {
    const buyer = findBuyerByEmail(email);
    const merchant = findMerchantByEmail(email);
    const admin = findAdminByEmail(email);
    return buyer || merchant || admin;
}

// Buyer
export const findAllBuyers= () =>
    buyerModel.find();

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
    merchantModel.find();

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
    adminModel.find();

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