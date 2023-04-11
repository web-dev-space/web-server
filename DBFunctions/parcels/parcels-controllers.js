import * as parcelsDao from './parcels-dao.js';

export const ParcelsController = (app) => {
    app.get('/parcels', findAllParcels);
    app.get('/parcels/:id', findParcelById);
    app.get('/parcels/trackingNumber/:trackingNumber', findParcelByTrackingNumber);
    app.post('/parcels', createParcel);
    app.delete('/parcels/:id', deleteParcel);
    app.put('/parcels/:id', updateParcel);
}

// Find - all / by id / by trackingNumber
const findAllParcels = async (req, res) => {
    const parcels = await parcelsDao.findAllParcels();
    res.json(parcels);
};

const findParcelById = async (req, res) => {
    const idToFind = req.params.id;
    const parcel = await parcelsDao.findParcelById(idToFind);
    res.json(parcel);
};

const findParcelByTrackingNumber = async (req, res) => {
    const trackingNumber = req.params.trackingNumber;
    const parcel = await parcelsDao.findParcelByTrackingNumber(trackingNumber);
    res.json(parcel);
};

// Create
const createParcel = async (req, res) => {
    const newParcel = req.body;
    const insertedParcel = await parcelsDao.createParcel(newParcel);
    res.json(insertedParcel);
};

// Delete -- return null when unsuccessful
const deleteParcel = async (req, res) => {
    const idToDelete = req.params.id;
    const status = await parcelsDao.deleteParcel(idToDelete);
    res.json(status);
};

// Update
const updateParcel = async (req, res) => {
    const idToUpdate = req.params.id;
    const updatedParcel = req.body;
    console.log(updatedParcel);
    const status = await parcelsDao.updateParcel(idToUpdate, updatedParcel);
    res.json(status);
};
