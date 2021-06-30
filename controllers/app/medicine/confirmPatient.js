const joi = require("joi");

const mongo = require("../../../config/mongodb");
const ApiError = require("../../../utils/ApiError");
const auth = require("../../../utils/auth");
const CUSTOM_MESSAGE = require("../../../utils/message");

const payload = {
  body: joi.object().keys({
    patientId: joi.string().required(),
  }),
};

async function handler({ body, user }) {
  let { patientId } = body;
  let { userId } = user;
  let Patient = await mongo.ggDb
    .model(mongo.models.medicalPatients)
    .find({ query: { _id: patientId }, crby: userId });
  if (!Patient)
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      CUSTOM_MESSAGE.MEDICINE_FORM_NOT_FOUND
    );
  let confirmPatient = await mongo.ggDb
    .model(mongo.models.medicalPatients)
    .findOneAndUpdate({
      query: { _id: patientId },
      update: { status: "submitted" },
      options: { new: true },
    });
  confirmPatient.msg = CUSTOM_MESSAGE.PATIENT_CREATED;
  return confirmPatient;
}

module.exports = {
  payload,
  handler,
  auth: true,
};
