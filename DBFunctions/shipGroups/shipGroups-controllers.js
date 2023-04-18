import * as shipGroupsDao from "./shipGroups-dao.js";

export const ShipGroupsController = (app) => {
  app.get("/shipGroups/count", getShipGroupTotalNumber);
  app.get('/shipGroups/countRecentRegister/monthly', generate_countRecentRegister('monthly'))
  app.get('/shipGroups/countRecentRegister/weekly', generate_countRecentRegister('weekly'))
  app.get("/shipGroups/recentActivity/monthly", getShipmentRecentActivityMonthly);
  app.get("/shipGroups/recentActivity/weekly", getShipmentRecentActivityWeekly);
  app.get("/shipGroups/topFiveLeaders", getFiveLeadersWithMostShipments)
  app.get("/shipGroups/topFiveUsers", getFiveUsersWithMostShipments);
  app.get("/shipGroups", findAllShipGroups);
  app.get("/shipGroups/:id", findShipGroupById);
  app.get(
    "/shipGroups/trackingNumber/:trackingNumber",
    findShipGroupByTrackingNumber
  );
  app.post("/shipGroups/updateTotalWeight", calAndAddTotalWeightToAllShipGroups);
  app.post("/shipGroups", createShipGroup);
  app.delete("/shipGroups/:id", deleteShipGroup);
  app.put("/shipGroups/:id", updateShipGroup);
};

// Find - all / by id / by trackingNumber
const findAllShipGroups = async (req, res) => {
  try {
    const shipGroups = await shipGroupsDao.findAllShipGroups();
    res.json(shipGroups);
  } catch (err) {
    res.status(500).send({ status: 500, detail: err.message });
  }
};

const findShipGroupById = async (req, res) => {
  try {
    const idToFind = req.params.id;
    const shipGroup = await shipGroupsDao.findShipGroupById(idToFind);
    res.json(shipGroup);
  } catch (err) {
    res.status(500).send({ status: 500, detail: err.message });
  }
};

const findShipGroupByTrackingNumber = async (req, res) => {
  try {
    const trackingNumber = req.params.trackingNumber;
    const shipGroup = await shipGroupsDao.findShipGroupByTrackingNumber(
      trackingNumber
    );
    res.json(shipGroup);
  } catch (err) {
    res.status(500).send({ status: 500, detail: err.message });
  }
};

// Create
const createShipGroup = async (req, res) => {
  try {
    const newShipGroup = req.body;

    const insertedShipGroup = await shipGroupsDao.createShipGroup(newShipGroup);
    res.json(insertedShipGroup);
  } catch (err) {
    res.status(500).send({ status: 500, detail: err.message });
  }
};

// Delete -- return null when unsuccessful
const deleteShipGroup = async (req, res) => {
  try {
    const idToDelete = req.params.id;
    await shipGroupsDao.deleteShipGroup(idToDelete);
    res.json({});
  } catch (err) {
    res.status(500).send({ status: 500, detail: err.message });
  }
};

// Update
const updateShipGroup = async (req, res) => {
  try {
    const idToUpdate = req.params.id;
    const updatedShipGroup = req.body;
    const status = await shipGroupsDao.updateShipGroup(
      idToUpdate,
      updatedShipGroup
    );
    res.json(status);
  } catch (err) {
    res.status(500).send({ status: 500, detail: err.message });
  }
};

const getShipGroupTotalNumber = async (req, res) => {
  try {
    const answer = await shipGroupsDao.countAllShipGroups();
    res.json(answer);
  } catch (err) {
    res.status(500).send({ status: 500, detail: err.message });
  }
};

const getShipmentRecentActivityMonthly = async (req, res) => {
  try {
    const answer = await shipGroupsDao.getShipmentRecentActivity('monthly');
    res.json(answer);
  } catch (err) {
    res.status(500).send({ status: 500, detail: err.message });
  }
};

const getShipmentRecentActivityWeekly = async (req, res) => {
  try {
    const answer = await shipGroupsDao.getShipmentRecentActivity('weekly');
    res.json(answer);
  } catch (err) {
    res.status(500).send({ status: 500, detail: err.message });
  }
};

const getFiveLeadersWithMostShipments = async (req, res) => {
  try {
    const answer = await shipGroupsDao.getFiveLeadersWithMostShipments();
    res.json(answer);
  } catch (err) {
    res.status(500).send({ status: 500, detail: err.message });
  }
};

const getFiveUsersWithMostShipments = async (req, res) => {
  try {
    const answer = await shipGroupsDao.getFiveLeadersWithMostShipments();
    res.json(answer);
  } catch (err) {
    res.status(500).send({ status: 500, detail: err.message });
  }
};


const generate_countRecentRegister = (type) => {
  return async (req, res) => {
    try {
      const answer = await shipGroupsDao.countRecentRegister(type);
      res.json(answer);
    } catch (error) {
      res.status(500).json({ message: error?.message });
    }
  }
}

const calAndAddTotalWeightToAllShipGroups = async (req, res) => {
  try {
    const answer = await shipGroupsDao.calAndAddTotalWeightToAllShipGroups();
    res.json(answer);
  } catch (err) {
    res.status(500).send({ status: 500, detail: err.message });
  }
};
