const joi = require("joi");
const httpStatus = require("http-status");

const mongo = require("../../../config/mongodb");
const ApiError = require("../../../utils/ApiError");
const auth = require("../../../utils/auth");
const CUSTOM_MESSAGE = require("../../../utils/message");

async function handler({ user }) {
  // console.log("logout: body: ", user)
  let { userId } = user;

  let userData = await mongo.ggDb.model(mongo.models.medicalUsers).findOne({
    query: {
      _id: userId,
    },
    select: { updatedAt: false, password: 0 },
  });
  if (!userData) {
    throw new ApiError(httpStatus.BAD_REQUEST, CUSTOM_MESSAGE.USER_NOT_FOUND);
  }
  mongo.ggDb
    .model(mongo.models.tokens)
    .deleteMany({ query: { userId: userId } });
  let finalResponce = {
    userId: userId,
    msg: CUSTOM_MESSAGE.LOGOUT_SUCESSFULLY,
  };
  return finalResponce;
}

module.exports = { handler, auth: true };
