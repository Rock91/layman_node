const joi = require("joi");
const httpStatus = require("http-status");

const mongo = require("../../../config/mongodb");
const ApiError = require("../../../utils/ApiError");
const auth = require("../../../utils/auth");
const CUSTOM_MESSAGE = require("../../../utils/message");

const payload = {
  body: joi.object().keys({
    managerId: joi.string().required(),
  }),
};

async function handler({ body, user }) {
  let { managerId, firstName, lastName, email, password } = body;
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

  let checkMedicalManagerIsExists = await mongo.ggDb
    .model(mongo.models.medicalUsers)
    .findOne({
      query: {
        _id: managerId,
        isDelete: false,
      },
      select: {
        updatedAt: false,
        isBlock: false,
      },
    });
  if (!checkMedicalManagerIsExists)
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      CUSTOM_MESSAGE.MEDICAL_MANAGER_NOT_FOUND
    );

  let updateMedicalManager = await mongo.ggDb
    .model(mongo.models.medicalUsers)
    .findOneAndUpdate({
      query: { _id: checkMedicalManagerIsExists._id },
      update: { isDelete: true },
      options: { new: true },
    });

  updateMedicalManager.msg = CUSTOM_MESSAGE.MEDICAL_MANAGER_DELETED;
  return updateMedicalManager;
}

module.exports = {
  payload,
  handler,
  auth: true,
};
