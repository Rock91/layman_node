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
      },
      select: {
        updatedAt: false,
        isBlock: false,
      },
    });

  let medicalStoreInfo = await mongo.ggDb
    .model(mongo.models.medicalStores)
    .findOne({
      query: {
        _id: medicalUserInfo.medicalStore,
      },
      select: {
        updatedAt: false,
      },
    });
  if (!medicalStoreInfo) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      CUSTOM_MESSAGE.MEDICAL_STORE_NOT_FOUND
    );
  }
  medicalStoreInfo.msg = CUSTOM_MESSAGE.MEDICAL_PROFILE_FOUND;
  return medicalStoreInfo;
}

module.exports = {
  handler,
  auth: true,
};
