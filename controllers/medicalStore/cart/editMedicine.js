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
    medicine: joi.string().optional(),
    componeyName: joi.string().optional(),
    type: joi
      .string()
      .optional()
      .description(
        "Liquid,Tablet,Capsules,Topical medicines,Suppositories,Drops,Inhalers,Injections"
      ),
    price: joi.number().optional(),
    quantity: joi.number().optional(),
  }),
};
async function handler({ body }) {
  let { orderId, cartId, medicine, componeyName, type, price, quantity } = body;

  let findCartItem = await mongo.ggDb
    .model(mongo.models.medicineCarts)
    .findOne({
      query: {
        patient: orderId,
        medicalUser: userId,
        _id: cartId,
      },
    });
  if (!findCartItem) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      CUSTOM_MESSAGE.CART_ITEM_NOT_FOUND
    );
  }

  let updateMedicine = {};
  if (medicine) updateMedicine.medicine = medicine;
  if (componeyName) updateMedicine.componeyName = componeyName;
  if (type) updateMedicine.type = type;
  if (price) updateMedicine.price = price;
  if (quantity) updateMedicine.quantity = quantity;

  let updateMedicine = await mongo.ggDb
    .model(mongo.models.medicineCarts)
    .findOneAndUpdate({
      query: { _id: cartId },
      update: updateMedicine,
      options: { new: true },
    });
  updateMedicine.msg = CUSTOM_MESSAGE.MEDICINE_SUCCESSFULLY_UPDATED;
  return updateMedicine;
}

module.exports = {
  payload,
  handler,
  auth: true,
};
