const joi = require("joi");
const httpStatus = require("http-status");

const mongo = require("../../../config/mongodb");
const ApiError = require("../../../utils/ApiError");
const auth = require("../../../utils/auth");
const CUSTOM_MESSAGE = require("../../../utils/message");

const payload = {
  body: joi.object().keys({
    firstName: joi.string(),
    lastName: joi.string(),
    mobileNumber: joi.number(),
  }),
};

async function handler({ body, user }) {
  let { firstName, lastName, mobileNumber } = body;
  let { userId } = user;

  let UserInfo = await mongo.ggDb.model(mongo.models.medicalStores).findOne({
    query: {
      _id: userId,
    },
  });
  if (!UserInfo)
    throw new ApiError(httpStatus.BAD_REQUEST, CUSTOM_MESSAGE.USER_NOT_FOUND);
  if (mobileNumber) {
    let mobileNumberInfo = await mongo.ggDb
      .model(mongo.models.medicalStores)
      .findOne({
        query: {
          mobileNumber: mobileNumber,
        },
      });
    if (
      mobileNumberInfo &&
      mobileNumberInfo.mobileNumber != UserInfo.mobileNumber
    )
      throw new ApiError(
        httpStatus.BAD_REQUEST,
        CUSTOM_MESSAGE.MOBILE_ALREADY_EXISTS
      );
  }

  let update = {};
  //   if (email) update.email = email;
  if (firstName) update.firstName = firstName;
  if (lastName) update.lastName = lastName;
  if (mobileNumber) update.mobileNumber = mobileNumber;

  let updateRes = await mongo.ggDb
    .model(mongo.models.medicalStores)
    .findOneAndUpdate({
      query: {
        _id: userId,
      },
      update: update,
      options: {
        new: true,
      },
    });
  // console.log("\nSDK : User : Profile : updateRes ::",JSON.stringify(updateRes))
  updateRes.msg = CUSTOM_MESSAGE.USER_PROFILE_UPDATED;
  return updateRes;
}

module.exports = {
  payload,
  handler,
  auth: true,
};
