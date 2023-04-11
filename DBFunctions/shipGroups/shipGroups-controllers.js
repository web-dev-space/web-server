import * as shipGroupsDao from './shipGroups-dao.js';

export const ShipGroupsController = (app) => {
    app.get('/shipGroups', findAllShipGroups);
    app.get('/shipGroups/:id', findShipGroupById);
    app.get('/shipGroups/trackingNumber/:trackingNumber', findShipGroupByTrackingNumber);
    app.post('/shipGroups', createShipGroup);
    app.delete('/shipGroups/:id', deleteShipGroup);
    app.put('/shipGroups/:id', updateShipGroup);
}

// Find - all / by id / by trackingNumber
const findAllShipGroups = async (req, res) => {
    const shipGroups = await shipGroupsDao.findAllShipGroups();
    res.json(shipGroups);
};

const findShipGroupById = async (req, res) => {
    const idToFind = req.params.id;
    const shipGroup = await shipGroupsDao.findShipGroupById(idToFind);
    res.json(shipGroup);
};

const findShipGroupByTrackingNumber = async (req, res) => {
    const trackingNumber = req.params.trackingNumber;
    const shipGroup = await shipGroupsDao.findShipGroupByTrackingNumber(trackingNumber);
    res.json(shipGroup);
};

// Create
const createShipGroup = async (req, res) => {
    const newShipGroup = req.body;
    const insertedShipGroup = await shipGroupsDao.createShipGroup(newShipGroup);
    res.json(insertedShipGroup);
};

// Delete -- return null when unsuccessful
const deleteShipGroup = async (req, res) => {
    const idToDelete = req.params.id;
    const status = await shipGroupsDao.deleteShipGroup(idToDelete);
    res.json(status);
};

// Update
const updateShipGroup = async (req, res) => {
    const idToUpdate = req.params.id;
    const updatedShipGroup = req.body;
    const status = await shipGroupsDao.updateShipGroup(idToUpdate, updatedShipGroup)
            .then(() => shipGroupsDao.findShipGroupById(idToUpdate));
    res.json(status);
};
