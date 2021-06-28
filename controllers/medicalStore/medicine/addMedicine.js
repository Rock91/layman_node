const joi = require("joi");
const httpStatus = require("http-status");

const mongo = require("../../../config/mongodb");
const ApiError = require("../../../utils/ApiError");
const auth = require("../../../utils/auth");
const CUSTOM_MESSAGE = require("../../../utils/message");

const payload = {
  body: joi.object().keys({
    name: joi.string().required(),
    componeyName: joi.string().required(),
    type: joi
      .string()
      .optional()
      .description(
        "Liquid,Tablet,Capsules,Topical medicines,Suppositories,Drops,Inhalers,Injections"
      ),
  }),
};
async function handler({ body }) {
  let { name, componeyName, type } = body;

  let InsertMedicine = await mongo.ggDb
    .model(mongo.models.medicines)
    .insertOne({
      document: { name, componeyName, type },
    });
  InsertMedicine.msg = CUSTOM_MESSAGE.MEDICINE_SUCCESSFULLY_ADDED;
  return InsertMedicine;
}

module.exports = {
  payload,
  handler,
};
