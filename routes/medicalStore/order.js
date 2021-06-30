const express = require("express");

const getOrderDetailsController = require("../../controllers/medicalStore/order/getOrderDetails");
const getOrderListController = require("../../controllers/medicalStore/order/getOrderList");

const requestHandler = require("../../middlewares/requestHandler");

const router = express.Router();

router.get("/", (req, res) => {
  res.send(req.originalUrl);
});

/**
 * API for get OrderList Info
 * @route GET /medicalStore/order/getOrderListController
 * @group Medical Store Api [Medical Order List Info]
 * @returns {object} 200 - Successful
 * @returns {Error}  default - Unexpected error
 * @security JWT
 */
router.get("/getOrderListController", requestHandler(getOrderListController));

/**
 * API for get Order Details Info
 * @route POST /medicalStore/order/getOrderDetails
 * @group Medical Store Api [Medical Order Info]
 * @param {getOrderDetails.model} Data.body.required - get Order Details
 * @returns {object} 200 - Successful
 * @returns {Error}  default - Unexpected error
 * @security JWT
 */

/**
 * @typedef getOrderDetails
 * @property {string} orderId - Enter order id [required] - order id - 52asdeqwe
 */
router.post("/getOrderDetails", requestHandler(getOrderDetailsController));
module.exports = router;
