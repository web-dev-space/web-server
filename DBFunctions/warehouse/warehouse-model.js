import mongoose from 'mongoose';
import warehouseSchema from "./warehouse-schema.js";

const Warehouse = mongoose.model('WarehouseModel', warehouseSchema, 'warehouse');

export default Warehouse;