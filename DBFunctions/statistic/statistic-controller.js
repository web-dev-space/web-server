import * as ShipGroupDao from "../shipGroups/shipGroups-dao.js";
import * as ParcelsDao from "../parcels/parcels-dao.js";

const statisticController = (app) => {
    app.get("/stat/merchant", findDashboardMerchant);
}

export default statisticController;

const findDashboardMerchant = async (req, res) => {
    try {
        const [
            shipGroupCount,
            shipmentRecentActivity,
            fiveLeadersWithMostShipments,
            fiveUsersWithMostShipments,
            parcelCount
        ] = await Promise.all([
            ShipGroupDao.countAllShipGroups(),
            ShipGroupDao.getShipmentRecentActivityAll(),
            ShipGroupDao.getFiveLeadersWithMostShipments(),
            ShipGroupDao.getFiveUsersWithMostShipments(),
            ParcelsDao.countAllParcels()
        ]);

        const answer = {
            ...shipGroupCount,
            ...shipmentRecentActivity,
            ...fiveLeadersWithMostShipments,
            ...fiveUsersWithMostShipments,
            ...parcelCount
        };

        res.json(answer);
    } catch (err) {
        res.status(500).send({ status: 500, detail: err.message });
    }
};

