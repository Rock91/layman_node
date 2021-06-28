const express = require("express");

const getMedicineController = require("../../controllers/medicalStore/medicine/getMedicine");
const addMedicineController = require("../../controllers/medicalStore/medicine/addMedicine");

const requestHandler = require("../../middlewares/requestHandler");

const router = express.Router();

router.get("/", (req, res) => {
  res.send(req.originalUrl);
});

/**
 * API for get Medicine Info
 * @route POST /medicalStore/medicine/getMedicineInfo
 * @group Medical Store Api [Medicine Info]
 * @param {getMedicalInfo.model} Data.body.required - get Medicine Info
 * @returns {object} 200 - Successful
 * @returns {Error}  default - Unexpected error
 * @security JWT
 */
/**
 * @typedef getMedicalInfo
 * @property {string} name - Enter medicine name [required] - Laycozine
 */
router.post("/getMedicalInfo", requestHandler(getMedicineController));

/**
 * API for Add Medicine Info
 * @route POST /medicalStore/medicine/addMedicine
 * @group Medical Store Api [Medicine Info]
 * @param {addMedicine.model} Data.body.required - Add Medicine Info
 * @returns {object} 200 - Successful
 * @returns {Error}  default - Unexpected error
 * @security JWT
 */

/**
 * @typedef addMedicine
 * @property {string} name - Enter name [required] - name - Lycozine
 * @property {string} componeyName - Enter componeyName [required] - SunPharma
 * @property {string} type - Enter type [optional] - "Liquid,Tablet,Capsules,Topical medicines,Suppositories,Drops,Inhalers,Injections
 */
router.post("/addMedicine", requestHandler(addMedicineController));
module.exports = router;
