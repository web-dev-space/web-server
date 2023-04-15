import * as ShipGroupDao from "../shipGroups/shipGroups-dao.js";


const statisticController = (app) => {
    app.get("/stat/merchant", findDashboardMerchant);
}

export default statisticController;

const findDashboardMerchant = async (req, res) => {
    try {
        const answer = {
            ...await ShipGroupDao.countAllShipGroups(),
            ...await ShipGroupDao.getShipmentRecentActivity(),
            ...await ShipGroupDao.getFiveLeadersWithMostShipments(),
            ...await ShipGroupDao.getFiveUsersWithMostShipments(),
        };

        res.json(answer);
    } catch (err) {
        res.status(500).send({ status: 500, detail: err.message });
    }
};

