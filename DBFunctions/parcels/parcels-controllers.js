import * as parcelsDao from './parcels-dao.js';

export const ParcelsController = (app) => {
    app.get('/parcels/count', countAllParcels);
    app.get('/parcels', findAllParcels);
    app.get('/parcels/:id', findParcelById);
    app.get('/parcels/trackingNumber/:trackingNumber', findParcelByTrackingNumber);
    app.post('/parcels', createParcel);
    app.delete('/parcels/:id', deleteParcel);
    app.put('/parcels/:id', updateParcel);
}


// Find - all / by id / by trackingNumber
const findAllParcels = async (req, res) => {
    try {
        const shipGroupId = req?.query?.shipGroupId;
        const userEmail = req?.query?.userEmail;

        let parcels;

        if (shipGroupId && userEmail) {
            parcels = await parcelsDao.findParcelsInShipGroupAndCurrentUser(shipGroupId, userEmail);
        } else if (shipGroupId) {
            parcels = await parcelsDao.findParcelsInShipGroup(shipGroupId);
        } else {
            parcels = await parcelsDao.findAllParcels();
        }

        res.json(parcels);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const findParcelById = async (req, res) => {
    try {
        const idToFind = req.params.id;
        const parcel = await parcelsDao.findParcelById(idToFind);
        res.json(parcel);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const findParcelByTrackingNumber = async (req, res) => {
    try {
        const trackingNumber = req.params.trackingNumber;
        const parcel = await parcelsDao.findParcelByTrackingNumber(trackingNumber);
        res.json(parcel);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create
const createParcel = async (req, res) => {
    try {
        const newParcel = req.body;
        const insertedParcel = await parcelsDao.createParcel(newParcel);
        res.json(insertedParcel);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete -- return null when unsuccessful
const deleteParcel = async (req, res) => {
    try {
        const idToDelete = req.params.id;
        const status = await parcelsDao.deleteParcel(idToDelete);
        res.json(status);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update
const updateParcel = async (req, res) => {
    try {
        const idToUpdate = req.params.id;
        const updatedParcel = req.body;
        const status = await parcelsDao.updateParcel(idToUpdate, updatedParcel)
            .then(() => parcelsDao.findParcelById(idToUpdate));
        res.json(status);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const countAllParcels = async (req, res) => {
    try {
        const answer = await parcelsDao.countAllParcels();
        res.json(answer);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
