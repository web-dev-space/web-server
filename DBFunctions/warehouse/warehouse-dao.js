import warehouseModel from "./warehouse-model.js";

export const findAllWarehouses = () =>
    warehouseModel.find();

export const findWarehouseById = (id) =>
    warehouseModel.findById(id);

export const findWarehouseByCompany = (company) =>
    warehouseModel.find().where('company').equals(company);

export const createWarehouse = (newWarehouse) =>
    warehouseModel.create(newWarehouse);

export const deleteWarehouse = (id) =>
    warehouseModel.findByIdAndDelete({_id: id})

export const updateWarehouse = (id, newWarehouse) =>
    warehouseModel.findByIdAndUpdate({_id: id}, {$set: newWarehouse});
