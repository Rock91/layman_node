const express = require("express");

const createPatientController = require("../../controllers/app/medicine/createPatient");
const confirmPatientController = require("../../controllers/app/medicine/confirmPatient");

const requestHandler = require("../../middlewares/requestHandler");

const router = express.Router();

router.get("/", (req, res) => {
  res.send(req.originalUrl);
});

/**
 * API for create Patient
 * @route POST /app/medicine/createPatient
 * @group APP Medicine Api [Auth]
 * @param {createPatient.model} Data.body.required - createPatient data
 * @returns {object} 200 - Successful
 * @returns {Error}  default - Unexpected error
 */

/**
 * @typedef createPatient
 * @property {number} mobile - User mobile [required] - eg: 9826856855
 * @property {string} countryCode - User countryCode [required] - eg: +91
 */

router.post("/createPatient", requestHandler(createPatientController));

/**
 * API for confirm Patient
 * @route POST /app/medicine/confirmPatient
 * @group APP Medicine Api [Auth]
 * @param {confirmPatient.model} Data.body.required - confirmPatient data
 * @returns {object} 200 - Successful
 * @returns {Error}  default - Unexpected error
 */

/**
 * @typedef confirmPatient
 * @property {string} patientId - patientId id [required] - eg: 59dd56ada
 */

router.post("/confirmPatient", requestHandler(confirmPatientController));

module.exports = router;
