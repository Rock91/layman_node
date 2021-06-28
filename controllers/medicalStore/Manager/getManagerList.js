const joi = require("joi");
const httpStatus = require("http-status");

const mongo = require("../../../config/mongodb");
const ApiError = require("../../../utils/ApiError");
const auth = require("../../../utils/auth");
const CUSTOM_MESSAGE = require("../../../utils/message");

async function handler({ user }) {
  let { userId } = user;

  let medicalUserInfo = await mongo.ggDb
    .model(mongo.models.medicalUsers)
    .findOne({
      query: {
        _id: userId,
        isDelete: false,
        role: "admin",
      },
      select: {
        updatedAt: false,
        isBlock: false,
      },
    });
  if (!medicalUserInfo) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      CUSTOM_MESSAGE.YOU_NOT_HAVE_ACCESE_FOR_THIS_FEATURE
    );
  }

  let medicalManagers = await mongo.ggDb.model(mongo.models.medicalUsers).find({
    query: {
      admin: userId,
      isDelete: false,
    },
    select: {
      updatedAt: false,
    },
  });
  if (!medicalManagers) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      CUSTOM_MESSAGE.MEDICAL_MANAGER_NOT_FOUND
    );
  }
  medicalManagers.msg = CUSTOM_MESSAGE.MEDICAL_MANAGER_LIST_FOUND;
  return medicalManagers;
}

module.exports = {
  handler,
  auth: true,
};
