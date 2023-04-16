import { buyerModel, merchantModel, adminModel, userModel } from './users-model.js';
import getLastSevenWeekDates from '../utils/getLastSevenWeekDates.js';

export const findAllUsers = async () => {
  const buyers = await findAllBuyers().exec();
  const merchants = await findAllMerchants().exec();
  const admins = await findAllAdmins().exec();
  return [...buyers, ...merchants, ...admins];
}

export const findUserById = async (id) => {
  const buyer = await findBuyerById(id).exec();
  const merchant = await findMerchantById(id).exec();
  const admin = await findAdminById(id).exec();
  return buyer || merchant || admin;
}

export const findUserByEmail = async (email) => {
  const buyer = await findBuyerByEmail(email).exec();
  const merchant = await findMerchantByEmail(email).exec();
  const admin = await findAdminByEmail(email).exec();
  return buyer || merchant || admin;
}

// Buyer
export const findAllBuyers = () =>
  buyerModel.find().where('role').equals('buyer');

export const findBuyerById = (id) =>
  buyerModel.findById(id);

export const findBuyerByEmail = (email) =>
  buyerModel.find().where('email').equals(email);

export const createBuyer = (newBuyer) =>
  buyerModel.create(newBuyer);

export const deleteBuyer = (id) =>
  buyerModel.findByIdAndDelete({ _id: id })

export const updateBuyer = (id, newBuyer) =>
  buyerModel.findByIdAndUpdate({ _id: id }, { $set: newBuyer });


// Merchant
export const findAllMerchants = () =>
  merchantModel.find().where('role').equals('merchant');

export const findMerchantById = (id) =>
  merchantModel.findById(id);

export const findMerchantByEmail = (email) =>
  merchantModel.find().where('email').equals(email);

export const createMerchant = (newMerchant) =>
  merchantModel.create(newMerchant);

export const deleteMerchant = (id) =>
  merchantModel.findByIdAndDelete({ _id: id })

export const updateMerchant = (id, newMerchant) =>
  merchantModel.findByIdAndUpdate({ _id: id }, { $set: newMerchant })


// Admin
export const findAllAdmins = () =>
  adminModel.find().where('role').equals('admin');

export const findAdminById = (id) =>
  adminModel.findById(id);

export const findAdminByEmail = (email) =>
  adminModel.find().where('email').equals(email);

export const createAdmin = (newAdmin) =>
  adminModel.create(newAdmin);

export const deleteAdmin = (id) =>
  adminModel.findByIdAndDelete({ _id: id })

export const updateAdmin = (id, newAdmin) =>
  adminModel.findByIdAndUpdate({ _id: id }, { $set: newAdmin })

export const countNewUsers = async () => {
  // count new users who registered in the last 7 days
  const today = new Date();
  // find the date 7 days ago
  const sevenDaysAgo = new Date(today - (7 * 24 * 60 * 60 * 1000));

  const newUserCounts = await buyerModel.countDocuments({ created: { $gte: sevenDaysAgo } });
  return { newUserCounts };
}

export const countRecentRegister = async (type) => {
  const multi = type === 'monthly' ? 30 : 7;

  const dateLimit = new Date();
  dateLimit.setDate(dateLimit.getDate() - 7 * multi);

  const pipelineResult = await userModel.aggregate([
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
