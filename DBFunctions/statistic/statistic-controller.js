import * as ShipGroupDao from "../shipGroups/shipGroups-dao.js";
import * as ParcelsDao from "../parcels/parcels-dao.js";
import * as UsersDao from "../users/users-dao.js";

const statisticController = (app) => {
    app.get("/stat/merchant", findDashboardMerchant);
    app.get("/stat/admin", findDashboardAdmin);
}

export default statisticController;

const findDashboardMerchant = async (req, res) => {
    try {
        const [
            shipGroupCount,
            shipmentRecentActivity,
            fiveLeadersWithMostShipments,
            fiveUsersWithMostShipments,
            parcelCount,
            groupShippedCount,
            shipmentRecentActivityNoGroup,
        ] = await Promise.all([
            ShipGroupDao.countAllShipGroups(),
            ShipGroupDao.getShipmentRecentActivityAll(),
            ShipGroupDao.getFiveLeadersWithMostShipments(),
            ShipGroupDao.getFiveUsersWithMostShipments(),
            ParcelsDao.countAllParcels(),
            ShipGroupDao.countAllGroupShipped(),
            ShipGroupDao.getShipmentRecentActivityNoGroup(),
        ]);

        const answer = {
            ...shipGroupCount,
            ...shipmentRecentActivity,
            ...fiveLeadersWithMostShipments,
            ...fiveUsersWithMostShipments,
            ...parcelCount,
            ...groupShippedCount,
            ...shipmentRecentActivityNoGroup,
        };

        res.json(answer);
    } catch (err) {
        res.status(500).send({ status: 500, detail: err.message });
    }
};

const findDashboardAdmin = async (req, res) => {
    try {
        const [
            shipGroupCount,
            shipmentRecentActivity,
            fiveLeadersWithMostShipments,
            fiveUsersWithMostShipments,
            parcelCount,
            newUserCount,
            countRecentRegisterUser,
            countRecentFormedShipGroup,
            groupShippedCount,
            shipmentRecentActivityNoGroup,
        ] = await Promise.all([
            ShipGroupDao.countAllShipGroups(),
            ShipGroupDao.getShipmentRecentActivityAll(),
            ShipGroupDao.getFiveLeadersWithMostShipments(),
            ShipGroupDao.getFiveUsersWithMostShipments(),
            ParcelsDao.countAllParcels(),
            UsersDao.countNewUsers(),
            UsersDao.countRecentRegisterAllTypes(),
            ShipGroupDao.countRecentFormedShipGroupAll(),
            ShipGroupDao.countAllGroupShipped(),
            ShipGroupDao.getShipmentRecentActivityNoGroup(),
        ]);

        const answer = {
            ...shipGroupCount,
            ...shipmentRecentActivity,
            ...fiveLeadersWithMostShipments,
            ...fiveUsersWithMostShipments,
            ...parcelCount,
            ...newUserCount,
            ...countRecentRegisterUser,
            ...countRecentFormedShipGroup,
            ...groupShippedCount,
            ...shipmentRecentActivityNoGroup,
        };

        res.json(answer);
    } catch (err) {
        res.status(500).send({ status: 500, detail: err.message });
    }
};
