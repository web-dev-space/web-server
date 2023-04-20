import shipGroupsModel from "./shipGroups-model.js";
import getLastSevenWeekDates from '../utils/getLastSevenWeekDates.js';
import ParcelModel from '../parcels/parcels-model.js';
import mongoose from "mongoose";

export const findAllShipGroups = async () => await shipGroupsModel.find();

export const findShipGroupById = async (id) =>
  await shipGroupsModel.findById(id);

export const findShipGroupByTrackingNumber = async (trackingNumber) =>
  await shipGroupsModel.findOne({ trackingNumber });

export const createShipGroup = async (newShipGroup) =>
  await shipGroupsModel.create(newShipGroup);

export const deleteShipGroup = async (id) =>
  await shipGroupsModel.findByIdAndDelete({ _id: id });

export const updateShipGroup = async (id, newShipGroup) =>
  await shipGroupsModel.findByIdAndUpdate(
    { _id: id },
    { $set: newShipGroup },
    { new: true }
  );

export const countAllShipGroups = async () => {
  return { totalShipGroupsNumber: await shipGroupsModel.countDocuments({}) };
};

export const countAllGroupShipped = async () => {
  return { totalGroupShipped: await shipGroupsModel.countDocuments({ phaseNumber: { $gte: 2 } }) };
};


export const getShipmentRecentActivityNoGroup = async (type = 'weekly') => {
  const multi = type === 'monthly' ? 30 : 7;

  const dateLimit = new Date();
  dateLimit.setDate(dateLimit.getDate() - 7 * multi);
  const pipelineResult = await shipGroupsModel.aggregate([
    {
      $match: {
        $expr: {
          $and: [
            { $gte: ["$created", dateLimit] },
            { $lte: ["$created", new Date()] }
          ]
        }
      },
    },
    {
      $addFields: {
        weekAgo: {
          $floor: {
            $subtract: [
              { $divide: [{ $subtract: [new Date(), "$created"] }, 86400000 * multi] },
              0
            ],
          },
        },
      },
    },
    {
      $group: {
        // must use `_id` to group and then project
        _id: { weekAgo: '$weekAgo' },
        count: { $sum: 1 }
      },
    },
    {
      $project: {
        _id: 0,
        weekAgo: "$_id.weekAgo",
        count: 1,
      }
    },
  ]).exec();

  console.log('pipelineResult', pipelineResult);


  const xList = type === 'monthly' ? [11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0] : [6, 5, 4, 3, 2, 1, 0];

  const temp = new Array(xList.length).fill(0);

  pipelineResult.forEach((item) => {
    const idx = xList.indexOf(item.weekAgo);
    if (idx >= 0) {
      temp[idx] = item.count;
    }
  });

  const recentActivity = {
    xValues: xList,
    yValues: temp,
  };

  return { recentShipGroupActivity: recentActivity };
};

export const getShipmentRecentShippedActivityNoGroup = async (type = 'weekly') => {
  const multi = type === 'monthly' ? 30 : 7;

  const dateLimit = new Date();
  dateLimit.setDate(dateLimit.getDate() - 7 * multi);
  const pipelineResult = await shipGroupsModel.aggregate([
    {
      $match: {
        $expr: {
          $and: [
            { $gte: ["$shipEndDate", dateLimit] },
            { $lte: ["$shipEndDate", new Date()] }
          ]
        }
      },
    },
    {
      $addFields: {
        weekAgo: {
          $floor: {
            $subtract: [
              { $divide: [{ $subtract: [new Date(), "$shipEndDate"] }, 86400000 * multi] },
              0
            ],
          },
        },
      },
    },
    {
      $group: {
        // must use `_id` to group and then project
        _id: { weekAgo: '$weekAgo' },
        count: { $sum: 1 }
      },
    },
    {
      $project: {
        _id: 0,
        weekAgo: "$_id.weekAgo",
        count: 1,
      }
    },
  ]).exec();

  console.log('pipelineResult', pipelineResult);


  const xList = type === 'monthly' ? [11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0] : [6, 5, 4, 3, 2, 1, 0];

  const temp = new Array(xList.length).fill(0);

  pipelineResult.forEach((item) => {
    const idx = xList.indexOf(item.weekAgo);
    if (idx >= 0) {
      temp[idx] = item.count;
    }
  });

  const recentActivity = {
    xValues: xList,
    yValues: temp,
  };

  return { recentShipGroupShippedActivity: recentActivity };
};

export const getShipmentRecentActivity = async (type) => {
  const multi = type === 'monthly' ? 30 : 7;

  const dateLimit = new Date();
  dateLimit.setDate(dateLimit.getDate() - 7 * multi);
  const pipelineResult = await shipGroupsModel.aggregate([
    {
      $match: {
        $expr: {
          $and: [
            { $gte: ["$created", dateLimit] },
            { $lte: ["$created", new Date()] }
          ]
        }
      },
    },
    {
      $addFields: {
        weekAgo: {
          $floor: {
            $subtract: [
              { $divide: [{ $subtract: [new Date(), "$created"] }, 86400000 * multi] },
              0
            ],
          },
        },
      },
    },
    {
      $group: {
        // must use `_id` to group and then project
        _id: { weekAgo: '$weekAgo', route: '$shipRoute' },
        count: { $sum: 1 }
      },
    },
    {
      $project: {
        _id: 0,
        weekAgo: "$_id.weekAgo",
        route: "$_id.route",
        count: 1,
      }
    },
  ]).exec();

  console.log('pipelineResult', pipelineResult);


  const routesList = ['Air Standard', 'Air Sensitive', "Sea Standard", "Sea Sensitive"];

  const xList = type === 'monthly' ? [11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0] : [6, 5, 4, 3, 2, 1, 0];

  const temp = routesList.reduce((acc, route) => {
    acc[route] = new Array(xList.length).fill(0);
    return acc;
  }, {});

  pipelineResult.forEach((item) => {
    const idx = xList.indexOf(item.weekAgo);
    if (idx >= 0) {
      temp[item.route][idx] = item.count;
    }
  });

  const recentActivity = routesList.map((route) => {
    return {
      route: route,
      data: temp[route]
    }
  });

  return { recentActivity: recentActivity };
};

export const getShipmentRecentActivityAll = async () => {
  const [activityWeekly, activityMonthly] = await Promise.all([
    getShipmentRecentActivity('weekly'),
    getShipmentRecentActivity('monthly')
  ]);

  return {
    activityWeekly: activityWeekly.recentActivity,
    activityMonthly: activityMonthly.recentActivity,
  }
}

export const getFiveLeadersWithMostShipments = async () => {
  const pipelineResult = await shipGroupsModel.aggregate([
    {
      $group: {
        _id: "$leader",
        amount: { $sum: 1 },
      },
    },
    { $sort: { amount: -1 } },
    { $limit: 5 },
    {
      $lookup: {
        from: "users",
        localField: "_id",
        foreignField: "email",
        as: "user",
      },
    },
    { $unwind: "$user" },
    {
      $addFields: {
        name: "$user.name",
        avatar: "$user.avatar",
      },
    },
    {
      $project: {
        _id: 0,
        email: "$_id",
        avatar: 1,
        name: 1,
        amount: 1,
      },
    },
  ]);

  const topFiveLeaders = pipelineResult.map((leader, index) => {
    return {
      ...leader,
      rank: `Top ${index + 1}`
    }
  });

  return { topFiveLeaders: topFiveLeaders };
};


export const getFiveUsersWithMostShipments = async () => {
  const pipelineResult = await shipGroupsModel.aggregate([
    { $unwind: "$members" },
    {
      $group: {
        _id: "$members",
        amount: { $sum: 1 },
      },
    },
    { $sort: { amount: -1 } },
    { $limit: 5 },
    {
      $lookup: {
        from: "users",
        localField: "_id",
        foreignField: "email",
        as: "user",
      },
    },
    { $unwind: "$user" },
    {
      $addFields: {
        name: "$user.name",
        avatar: "$user.avatar",
      },
    },
    {
      $project: {
        _id: 0,
        email: "$_id",
        avatar: 1,
        name: 1,
        amount: 1,
      },
    },
  ]);

  const topFiveUsers = pipelineResult.map((user, index) => {
    return {
      ...user,
      rank: `Top ${index + 1}`
    }
  })

  return { topFiveUsers: topFiveUsers };
};

export const countRecentFormedShipGroup = async (type) => {
  const multi = type === 'monthly' ? 30 : 7;

  const dateLimit = new Date();
  dateLimit.setDate(dateLimit.getDate() - 7 * multi);

  const pipelineResult = await shipGroupsModel.aggregate([
    {
      $match: {
        $expr: {
          $and: [
            { $gte: ["$created", dateLimit] },
            { $lte: ["$created", new Date()] }
          ]
        }
      },
    },
    {
      $addFields: {
        weekAgo: {
          $floor: {
            $subtract: [
              {
                $divide: [{
                  $subtract: [new Date(), "$created"]
                }, 86400000 * multi]
              },
              0
            ],
          },
        },
      },
    },
    {
      $group: {
        // must use `_id` to group and then project
        _id: { weekAgo: '$weekAgo' },
        count: { $sum: 1 },
      },
    },
    {
      $project: {
        _id: 0,
        weekAgo: "$_id.weekAgo",
        count: 1,
      }
    },
  ]).exec();

  const xList = type === 'monthly' ? [11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0] : [6, 5, 4, 3, 2, 1, 0];

  const data = new Array(xList.length).fill(0);

  pipelineResult.forEach((item) => {
    const idx = xList.indexOf(item.weekAgo);
    if (idx >= 0) {
      data[idx] = item.count;
    }
  });

  const monthList = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  const rotateArray = (arr, index) => {
    if (index === -1) {
      return arr;
    }
    return arr.slice(index, arr.length).concat(arr.slice(0, index));
  }

  const xValues = type === 'weekly'
    ? getLastSevenWeekDates()
    : rotateArray(monthList, new Date().getMonth() + 1);

  const recentActivity = {
    xValues: xValues,
    yValues: data,
  };

  return { recentActivity: recentActivity };

}

export const countRecentFormedShipGroupAll = async () => {
  const [activityWeekly, activityMonthly] = await Promise.all([
    countRecentFormedShipGroup('weekly'),
    countRecentFormedShipGroup('monthly')
  ]);

  return {
    recentFormedShipGroupWeekly: activityWeekly.recentActivity,
    recentFormedShipGroupMonthly: activityMonthly.recentActivity,
  }
};


export const getTotalWeight = async function (shipGroupId) {
  const result = await ParcelModel.aggregate([
    {
      $match: {
        shipGroup: shipGroupId,
        weight: { $exists: true }
      },
    },
    {
      $group: {
        _id: null,
        totalWeight: { $sum: '$weight' },
      },
    },
    {
      $project: { _id: 0 },
    },
  ]);

  if (result.length > 0) {
    return result[0].totalWeight;
  } else {
    return 0;
  }
};

export const addTotalWeight = async (shipGroup) => {
  const totalWeight = await getTotalWeight(shipGroup._id.toString());

  if (totalWeight !== null) {
    await shipGroupsModel.updateOne({ _id: shipGroup._id }, { totalWeight: totalWeight });
  }
}

export const calAndAddTotalWeightToAllShipGroups = async () => {
  const shipGroups = await shipGroupsModel.find({}).exec();

  await Promise.all(
    shipGroups.map(async (shipGroup) => {
      await addTotalWeight(shipGroup);
    })
  );

  return shipGroupsModel.find({}).exec();

};
