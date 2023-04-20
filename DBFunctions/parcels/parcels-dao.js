import parcelsModel from './parcels-model.js';
import mongoose from 'mongoose';

export const findAllParcels = () =>
  parcelsModel.find();

export const findParcelById = (id) =>
  parcelsModel.findById(id);

export const findParcelByTrackingNumber = (trackingNumber) =>
  parcelsModel.findOne({ trackingNumber });

export const createParcel = (newParcel) =>
  parcelsModel.create(newParcel);

export const deleteParcel = (id) =>
  parcelsModel.findByIdAndDelete({ _id: id });

export const updateParcel = (id, newParcel) =>
  parcelsModel.findByIdAndUpdate({ _id: id }, { $set: newParcel })

export const countAllParcels = async () => {
  return { totalParcelsNumber: await parcelsModel.countDocuments({}) };
}

export const findParcelsInShipGroup = async (shipGroupId) => {
  const objectId = mongoose.Types.ObjectId.isValid(shipGroupId)
    ? new mongoose.Types.ObjectId(shipGroupId)
    : null;

  const query = {
    shipGroup: { $in: objectId ? [shipGroupId, objectId] : [shipGroupId] },
  };

  return await parcelsModel.find(query).exec();
};

export const findParcelsInShipGroupAndCurrentUser = async (shipGroupId, userEmail) => {
  return await parcelsModel.find({ shipGroup: shipGroupId, user: userEmail }).exec();
};


export const getParcelRecentActivityNoGroup = async (type = 'weekly') => {
  const multi = type === 'monthly' ? 30 : 7;

  const dateLimit = new Date();
  dateLimit.setDate(dateLimit.getDate() - 7 * multi);
  const pipelineResult = await parcelsModel.aggregate([
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

  return { recentParcelActivity: recentActivity };
};

