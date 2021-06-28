const joi = require("joi");
const httpStatus = require("http-status");

const mongo = require("../../../config/mongodb");
const ApiError = require("../../../utils/ApiError");
const auth = require("../../../utils/auth");
const CUSTOM_MESSAGE = require("../../../utils/message");

const payload = {
  body: joi.object().keys({
    managerId: joi.string().required(),
    email: joi.string().optional(),
    firstName: joi.string().optional(),
    lastName: joi.string().optional(),
    password: joi.string().optional(),
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
      CUSTOM_MESSAGE.YOU_ARE_NOT_ABLE_TO_CREATE_MANAGER
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

  if (email) {
    let emailInfo = await mongo.ggDb.model(mongo.models.medicalUsers).findOne({
      query: { email: email },
    });
    if (emailInfo.email != checkMedicalManagerIsExists.email)
      throw new ApiError(
        httpStatus.BAD_REQUEST,
        CUSTOM_MESSAGE.EMAIL_ALREADY_EXISTS
      );
  }
  let updateData = {};
  if (firstName) updateData.firstName = firstName;
  if (lastName) updateData.lastName = lastName;
  if (email) updateData.email = email;
  if (password) updateData.password = password;

  let updateMedicalManager = await mongo.ggDb
    .model(mongo.models.medicalUsers)
    .findOneAndUpdate({
      query: { _id: checkMedicalManagerIsExists._id },
      update: updateData,
      options: { new: true },
    });

  updateMedicalManager.msg = CUSTOM_MESSAGE.MEDICAL_MANAGER_UPDATED;
  return updateMedicalManager;
}

module.exports = {
  payload,
  handler,
  auth: true,
};
