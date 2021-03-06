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
    storeName: joi.string().required(),
    mobileNumber: joi.number().required(),
  }),
};

async function handler({ body }) {
  let { firstName, lastName, mobileNumber, email, password, storeName } = body;

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
  if (mobileNumber) {
    let mobileNumberInfo = await mongo.ggDb
      .model(mongo.models.medicalUsers)
      .findOne({
        query: { mobileNumber: mobileNumber },
      });
    if (mobileNumberInfo)
      throw new ApiError(
        httpStatus.BAD_REQUEST,
        CUSTOM_MESSAGE.MOBILE_ALREADY_EXISTS
      );
  }

  let updateRes = await mongo.ggDb.model(mongo.models.medicalUsers).insertOne({
    document: { firstName, lastName, mobileNumber, email, password, storeName },
  });
  let MedicalStore = await mongo.ggDb
    .model(mongo.models.medicalStores)
    .insertOne({
      document: {
        storeName,
        crby: updateRes._id,
      },
    });
  updateRes = await mongo.ggDb
    .model(mongo.models.medicalUsers)
    .findOneAndUpdate({
      query: { _id: updateRes._id },
      update: { medicalStore: MedicalStore._id },
    });
  updateRes.msg = CUSTOM_MESSAGE.MEDICAL_PROFILE_CREATED;
  return updateRes;
}

module.exports = {
  payload,
  handler,
};
