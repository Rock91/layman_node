const joi = require("joi");
const httpStatus = require("http-status");
const moment = require("moment");

const mongo = require("../../../config/mongodb");
const ApiError = require("../../../utils/ApiError");
const auth = require("../../../utils/auth");
const otp = require("../../../utils/otp");
const config = require("../../../config/config");
const CUSTOM_MESSAGE = require("../../../utils/message");

const payload = {
  body: joi.object().keys({
    email: joi.string().email().required(),
    password: joi.string().required(),
  }),
};

async function handler({ body }) {
  let { email, password } = body;

  let user = await mongo.ggDb.model(mongo.models.medicalStores).findOne({
    query: {
      email: email,
    },
  });
  if (!user) {
    throw new ApiError(httpStatus.BAD_REQUEST, CUSTOM_MESSAGE.INVALID_EMAIL);
  } else if (user && user.password != password) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      CUSTOM_MESSAGE.INVALID_EMAIL_OR_PASSWORD
    );
  } else if (user && user.isBlock) {
    throw new ApiError(httpStatus.BAD_REQUEST, CUSTOM_MESSAGE.YOU_ARE_BLOCKED);
  }
  let { error, token } = await auth.generateTokenForUsers(
    { _id: user._id, email: user.email, type: "access" },
    { expiresIn: 100000000 /*2400 * 60 * 60*/ }
  );
  if (error) {
    throw new ApiError(error);
  }
  var sendData = {
    user: user,
    token: token,
  };
  sendData.msg = CUSTOM_MESSAGE.LOGIN_SUCCESFULLY;
  return sendData;
}

module.exports = {
  payload,
  handler,
};
