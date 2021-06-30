const joi = require("joi");
const httpStatus = require("http-status");

const mongo = require("../../../config/mongodb");
const CUSTOM_MESSAGE = require("../../../utils/message");

const payload = {
  body: joi.object().keys({
    startDate: joi.string().optional(),
    endDate: joi.string().optional(),
    status: joi.string().optional(),
    page: joi.number().required(),
    limit: joi.number().required(),
  }),
};
async function handler({ body, users }) {
  let { startDate, endDate, status, page, limit } = body;
  let { userId } = users;
  let Page = 1;
  let Limit = 20;
  let EndDate = new Date().setHours(23, 59, 59, 59);
  let StartDate = new Date().setHours(0, 0, 0, 000);
  if (startDate) StartDate = startDate;
  if (endDate) EndDate = endDate;
  if (page) Page = page;
  if (limit) Limit = limit;

  let findOrder = await mongo.ggDb
    .model(mongo.models.medicalPatients)
    .paginate({
      query: {
        createdAt: {
          $gte: StartDate,
          $lte: EndDate,
        },
      },
      limit,
      page,
      sort,
    });

  findOrder.msg = CUSTOM_MESSAGE.MEDICINE_ORDER_LIST;
  return findOrder;
}

module.exports = {
  payload,
  handler,
  auth: true,
};
