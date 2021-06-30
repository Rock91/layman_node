const joi = require("joi");
const httpStatus = require("http-status");

const mongo = require("../../../config/mongodb");
const ApiError = require("../../../utils/ApiError");
const auth = require("../../../utils/auth");
const CUSTOM_MESSAGE = require("../../../utils/message");

const payload = {
  body: joi.object().keys({
    orderId: joi.string().required(),
    medicine: joi.string().required(),
    componeyName: joi.string().required(),
    type: joi
      .string()
      .optional()
      .description(
        "Liquid,Tablet,Capsules,Topical medicines,Suppositories,Drops,Inhalers,Injections"
      ),
    price: joi.number().required(),
    quantity: joi.number().required(),
  }),
};
async function handler({ body }) {
  let { orderId, medicine, componeyName, type, price, quantity } = body;

  let InsertMedicine = await mongo.ggDb
    .model(mongo.models.medicineCarts)
    .insertOne({
      document: {
        patient: orderId,
        medicalUser: userId,
        medicine,
        componeyName,
        type,
        price,
        quantity,
        priceWithOutGST: price,
      },
    });
  InsertMedicine.msg = CUSTOM_MESSAGE.MEDICINE_SUCCESSFULLY_ADDED;
  return InsertMedicine;
}

module.exports = {
  payload,
  handler,
  auth: true,
};
