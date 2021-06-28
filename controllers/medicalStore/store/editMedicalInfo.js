const joi = require("joi");
const httpStatus = require("http-status");

const mongo = require("../../../config/mongodb");
const ApiError = require("../../../utils/ApiError");
const auth = require("../../../utils/auth");
const CUSTOM_MESSAGE = require("../../../utils/message");

const payload = {
  body: joi.object().keys({
    medicalStoreId: joi.string().required(),
    storeName: joi.string(),
    ownerName: joi.string(),
    ownerDOB: joi.date().iso(),
    email: joi.string().email(),
    address1: joi.string(),
    address2: joi.string(),
    area: joi.string(),
    pincode: joi.number(),
    city: joi.string(),
    state: joi.string(),
    country: joi.string(),
    mobileNumber: joi.number(),
    timings: joi
      .array()
      .items
      // joi.object().keys({
      //   day: joi
      //     .string()
      //     .valid([
      //       "MONDAY",
      //       "TUESDAY",
      //       "WEDNESDAY",
      //       "THURSDAY",
      //       "FRIDAY",
      //       "SATURDAY",
      //       "SUNDAY",
      //     ])
      //     .description("MONDAY"),
      //   openTime: joi.string().optional().description("HH:mm Format"),
      //   closeTime: joi.string().optional().description("HH:mm Format"),
      // })
      (),
  }),
};
async function handler({ body, user }) {
  let {
    medicalStoreId,
    storeName,
    ownerName,
    ownerDOB,
    email,
    address1,
    address2,
    area,
    pincode,
    city,
    state,
    country,
    mobileNumber,
  } = body;
  let { userId } = user;

  let medicalStoreInfo = await mongo.ggDb
    .model(mongo.models.medicalStores)
    .findOne({
      query: {
        _id: medicalStoreId,
        crby: userId,
      },
    });
  if (!medicalStoreInfo) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      CUSTOM_MESSAGE.MEDICAL_STORE_NOT_FOUND
    );
  }

  let updateMedicalInfo = {};
  if (storeName) updateMedicalInfo.storeName = storeName;
  if (ownerName) updateMedicalInfo.ownerName = ownerName;
  if (ownerDOB) updateMedicalInfo.ownerDOB = ownerDOB;
  if (email) updateMedicalInfo.email = email;
  if (address1) updateMedicalInfo.address1 = address1;
  if (address2) updateMedicalInfo.address2 = address2;
  if (area) updateMedicalInfo.area = area;
  if (pincode) updateMedicalInfo.pincode = pincode;
  if (city) updateMedicalInfo.city = city;
  if (state) updateMedicalInfo.state = state;
  if (country) updateMedicalInfo.country = country;
  if (mobileNumber) updateMedicalInfo.mobileNumber = mobileNumber;

  let updateMedicalStoreInfo = await mongo.ggDb
    .model(mongo.models.medicalStores)
    .findByIdAndUpdate({
      query: medicalStoreId,
      update: updateMedicalInfo,
      options: { new: true },
    });
  updateMedicalStoreInfo.msg = CUSTOM_MESSAGE.MEDICAL_PROFILE_FOUND;
  return updateMedicalStoreInfo;
}

module.exports = {
  payload,
  handler,
  auth: true,
};
