const joi = require("joi");
const httpStatus = require("http-status");

const mongo = require("../../../config/mongodb");
const ApiError = require("../../../utils/ApiError");
const auth = require("../../../utils/auth");
const CUSTOM_MESSAGE = require("../../../utils/message");

const payload = {
  body: joi.object().keys({
    email: joi.string().required(),
    firstName: joi.string().required(),
    lastName: joi.string().required(),
    password: joi.string().required(),
  }),
};

async function handler({ body, user }) {
  let { firstName, lastName, email, password } = body;
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

  if (email) {
    let emailInfo = await mongo.ggDb.model(mongo.models.medicalUsers).findOne({
      query: { email: email },
    });
    if (emailInfo)
      throw new ApiError(
        httpStatus.BAD_REQUEST,
        CUSTOM_MESSAGE.EMAIL_ALREADY_EXISTS
      );
  }

  let addMedicalManager = await mongo.ggDb
    .model(mongo.models.medicalUsers)
    .insertOne({
      document: {
        firstName,
        lastName,
        email,
        password,
        role: "manager",
        medicalStore: medicalUserInfo.medicalStore,
        admin: medicalUserInfo._id,
      },
    });

  addMedicalManager.msg = CUSTOM_MESSAGE.MEDICAL_MANAGER_CREATED;
  return addMedicalManager;
}

module.exports = {
  payload,
  handler,
  auth: true,
};
