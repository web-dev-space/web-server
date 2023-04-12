import mongoose from 'mongoose';
import shipGroupSchema from './shipGroups-schema.js';

const ShipGroup = mongoose.model('ShipGroupModel', shipGroupSchema, 'shipGroups');

export default ShipGroup;