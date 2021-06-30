const joi = require("joi");
const httpStatus = require("http-status");

const mongo = require("../../../config/mongodb");
const CUSTOM_MESSAGE = require("../../../utils/message");

const payload = {
  body: joi.object().keys({
    orderId: joi.string().required(),
  }),
};
async function handler({ body, users }) {
  let { orderId } = body;
  let { userId } = users;

  let findOrder = await mongo.ggDb.model(mongo.models.medicalPatients).findOne({
    query: {
      _id: orderId,
    },
  });
  if (!findOrder)
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      CUSTOM_MESSAGE.MEDICINE_ORDER_NOT_FOUND
    );
  findOrder.msg = CUSTOM_MESSAGE.MEDICINE_ORDER_FOUND;
  return findOrder;
}

module.exports = {
  payload,
  handler,
  auth: true,
};
