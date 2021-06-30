const joi = require("joi");
const httpStatus = require("http-status");

const mongo = require("../../../config/mongodb");
const CUSTOM_MESSAGE = require("../../../utils/message");

const payload = {
  body: joi.object().keys({
    orderId: joi.string().required(),
  }),
};
async function handler({ body, user }) {
  let { orderId } = body;
  let { userId } = user;

  let findAllCartItem = await mongo.ggDb
    .model(mongo.models.medicineCarts)
    .find({
      query: {
        patient: orderId,
        status: created,
        medicalUser: userId,
      },
    });

  let finalCartItem = {};
  let finalAmount = 0;
  let priceWithOutGST = 0;
  findAllCartItem.forEach((ITEM) => {
    priceWithOutGST = priceWithOutGST + Number(ITEM.priceWithOutGST);
    finalAmount = finalPrice + Number(ITEM.finalPrice);
    finalCartItem += 1;
  });
  finalCartItem = { ITEM, priceWithOutGST, finalAmount, finalCartItem };
  finalCartItem.msg = CUSTOM_MESSAGE.CART_DATA_FOUND;
  return finalCartItem;
}

module.exports = {
  payload,
  handler,
  auth: true,
};
