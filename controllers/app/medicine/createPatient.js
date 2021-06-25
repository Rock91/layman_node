const joi = require("joi");

const mongo = require("../../../config/mongodb");
const ApiError = require("../../../utils/ApiError");
const auth = require("../../../utils/auth");
const CUSTOM_MESSAGE = require("../../../utils/message");

const payload = {
  body: joi.object().keys({
    firstName: joi.string().required(),
    lastName: joi.string().required(),
    mobileNumber: joi.number().required(),
    address1: joi.string().required(),
    address2: joi.string().required(),
    area: joi.string().required(),
    pincode: joi.string().required(),
    city: joi.string().required(),
    state: joi.string().required(),
    country: joi.string().required(),
    callForInfo: joi.boolean(),
  }),
};

async function handler({ body, user }) {
  let {
    firstName,
    lastName,
    mobileNumber,
    address1,
    address2,
    area,
    pincode,
    city,
    state,
    country,
    callForInfo,
  } = body;
  let { userId } = user;

  let insertPatientData = {
    crby: userId,
    callForInfo: callForInfo,
    patient: {
      firstName,
      lastName,
      mobileNumber,
      address1,
      address2,
      area,
      pincode,
      city,
      state,
      country,
    },
  };
  let createPatient = await mongo.ggDb
    .model(mongo.models.medicalPatients)
    .insertOne({
      document: insertPatientData,
    });
  createPatient.msg = CUSTOM_MESSAGE.PATIENT_CREATED;
  return createPatient;
}

module.exports = {
  payload,
  handler,
  auth,
};
