const joi = require("joi");
const httpStatus = require("http-status");

const mongo = require("../../../config/mongodb");
const CUSTOM_MESSAGE = require("../../../utils/message");

const payload = {
  body: joi.object().keys({
    name: joi.string().required().allow(null).allow(""),
  }),
};
async function handler({ body }) {
  let { name } = body;

  let FindMedicine = await mongo.ggDb.model(mongo.models.medicines).find({
    query: {
      name: {
        $regex: new RegExp(name, "i"),
      },
      componeyName: {
        $regex: new RegExp(name, "i"),
      },
      isVerify: true,
    },
    limit: 20,
  });
  FindMedicine.msg = CUSTOM_MESSAGE.MEDICINE_FOUND;
  return FindMedicine;
}

module.exports = {
  payload,
  handler,
};
