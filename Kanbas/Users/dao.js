import model from "./model.js";
import mongoose from "mongoose";

export const createUser = (user) => {
  return model.create(user);
};

export const findAllUsers = () => model.find();

export const findUserById = (userId) => {
  // Check if the id is a valid ObjectId
  const isObjectId =
    mongoose.Types.ObjectId.isValid(userId) &&
    String(new mongoose.Types.ObjectId(userId)) === userId;

  if (isObjectId) {
    // If the id is an ObjectId, use `findById`
    return model.findById(userId);
  } else {
    // If the id is a string, treat it as a string-based _id
    return model.findOne({ _id: userId });
  }
};

export const findUserByUsername = (username) =>
  model.findOne({ username: username });
export const findUserByCredentials = (username, password) =>
  model.findOne({ username, password });
export const updateUser = (userId, user) =>
  model.updateOne({ _id: userId }, { $set: user });
export const deleteUser = (userId) => model.deleteOne({ _id: userId });
export const findUsersByRole = (role) => model.find({ role: role });
export const findUsersByPartialName = (partialName) => {
  const regex = new RegExp(partialName, "i"); // 'i' makes it case-insensitive
  return model.find({
    $or: [{ firstName: { $regex: regex } }, { lastName: { $regex: regex } }],
  });
};
export const findUsersByNameAndRole = (role, partialName) => {
  const regex = new RegExp(partialName, "i"); // 'i' for case-insensitivity
  return model.find({
    $and: [
      { role: role }, // Match the specified role
      {
        $or: [
          { firstName: { $regex: regex } }, // Match partial name in firstName
          { lastName: { $regex: regex } }, // Match partial name in lastName
        ],
      },
    ],
  });
};
