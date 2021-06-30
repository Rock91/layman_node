const joi = require("joi");
const httpStatus = require("http-status");

const mongo = require("../../../config/mongodb");
const ApiError = require("../../../utils/ApiError");
const auth = require("../../../utils/auth");
const CUSTOM_MESSAGE = require("../../../utils/message");

const payload = {
  body: joi.object().keys({
    orderId: joi.string().required(),
    cartId: joi.string().required(),
  }),
};
async function handler({ body }) {
  let { orderId, cartId } = body;

  let findCartItem = await mongo.ggDb
    .model(mongo.models.medicineCarts)
    .findOne({
      query: {
        _id: cartId,
      },
    });
  if (!findCartItem) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      CUSTOM_MESSAGE.CART_ITEM_NOT_FOUND
    );
  }

  let removeMedicine = await mongo.ggDb
    .model(mongo.models.medicineCarts)
    .findOneAndUpdate({
      query: { _id: cartId },
    });
  removeMedicine.msg = CUSTOM_MESSAGE.MEDICINE_REMOVED_FROM_CART;
  return removeMedicine;
}

module.exports = {
  payload,
  handler,
  auth: true,
};
