import postsModel from "./posts-model.js";
import { getLastSevenDayDates } from "../utils/getLastSevenWeekDates.js";

export const findAllPosts = () => postsModel.find();

export const findPostById = (id) => postsModel.findById(id);

export const createPost = (newPost) => postsModel.create(newPost);

export const deletePost = (id) => postsModel.findByIdAndDelete({ _id: id });

export const updatePost = (id, newPost) =>
  postsModel.findByIdAndUpdate({ _id: id }, { $set: newPost });

export const getPostsActivityDailyNoGroup = async () => {

  const dateLimit = new Date();
  dateLimit.setDate(dateLimit.getDate() - 7);
  const pipelineResult = await postsModel.aggregate([
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
              { $divide: [{ $subtract: [new Date(), "$created"] }, 86400000 * 1] },
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

  const xList = [6, 5, 4, 3, 2, 1, 0];

  const temp = new Array(xList.length).fill(0);

  pipelineResult.forEach((item) => {
    const idx = xList.indexOf(item.weekAgo);
    if (idx >= 0) {
      temp[idx] = item.count;
    }
  });

  const recentActivity = {
    xValues: getLastSevenDayDates(),
    yValues: temp,
  };

  return { recentPostsActivity: recentActivity };
};
