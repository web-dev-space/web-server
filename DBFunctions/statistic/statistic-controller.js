import * as ShipGroupDao from "../shipGroups/shipGroups-dao.js";
import * as ParcelsDao from "../parcels/parcels-dao.js";
import * as UsersDao from "../users/users-dao.js";
import * as PostDao from "../posts/posts-dao.js";

const statisticController = (app) => {
    app.get("/stat/merchant", findDashboardMerchant);
    app.get("/stat/admin", findDashboardAdmin);
}

export default statisticController;

// const findDashboardMerchant = async (req, res) => {
//     try {
//         const [
//             shipGroupCount,
//             shipmentRecentActivity,
//             fiveLeadersWithMostShipments,
//             fiveUsersWithMostShipments,
//             parcelCount,
//             groupShippedCount,
//             shipmentRecentActivityNoGroup,
//             parcelRecentActivityNoGroup,
//             shipmentRecentShippedActivity,
//         ] = await Promise.all([
//             ShipGroupDao.countAllShipGroups(),
//             ShipGroupDao.getShipmentRecentActivityAll(),
//             ShipGroupDao.getFiveLeadersWithMostShipments(),
//             ShipGroupDao.getFiveUsersWithMostShipments(),
//             ParcelsDao.countAllParcels(),
//             ShipGroupDao.countAllGroupShipped(),
//             ShipGroupDao.getShipmentRecentActivityNoGroup(),
//             ParcelsDao.getParcelRecentActivityNoGroup(),
//             ShipGroupDao.getShipmentRecentShippedActivityNoGroup(),
//         ]);

//         const answer = {
//             ...shipGroupCount,
//             ...shipmentRecentActivity,
//             ...fiveLeadersWithMostShipments,
//             ...fiveUsersWithMostShipments,
//             ...parcelCount,
//             ...groupShippedCount,
//             ...shipmentRecentActivityNoGroup,
//             ...parcelRecentActivityNoGroup,
//             ...shipmentRecentShippedActivity,
//         };

//         res.json(answer);
//     } catch (err) {
//         res.status(500).send({ status: 500, detail: err.message });
//     }
// };

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
            parcelRecentActivityNoGroup,
            shipmentRecentShippedActivity,
            recentPostsActivity,
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
            ParcelsDao.getParcelRecentActivityNoGroup(),
            ShipGroupDao.getShipmentRecentShippedActivityNoGroup(),
            PostDao.getPostsActivityDailyNoGroup(),
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
            ...parcelRecentActivityNoGroup,
            ...shipmentRecentShippedActivity,
            ...recentPostsActivity,
        };

        res.json(answer);
    } catch (err) {
        res.status(500).send({ status: 500, detail: err.message });
    }
};


const findDashboardMerchant = findDashboardAdmin;
