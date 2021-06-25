const express = require("express");

const getMedicalInfoController = require("../../controllers/medicalStore/store/getMedicalInfo");
const editMedicalInfoController = require("../../controllers/medicalStore/store/editMedicalInfo");

const requestHandler = require("../../middlewares/requestHandler");

const router = express.Router();

router.get("/", (req, res) => {
  res.send(req.originalUrl);
});

/**
 * API for get Medical Info
 * @route GET /medicalStore/store/getMedicalInfo
 * @group Medical Store Api [Auth]
 * @returns {object} 200 - Successful
 * @returns {Error}  default - Unexpected error
 * @security JWT
 */
router.get("/getMedicalInfo", requestHandler(getMedicalInfoController));

/**
 * API for Update Medical Info
 * @route POST /medicalStore/store/updateMedicalInfo
 * @group Medical Store Api [Auth]
 * @param {updateMedicalProfile.model} Data.body.required - Update Profile
 * @returns {object} 200 - Successful
 * @returns {Error}  default - Unexpected error
 * @security JWT
 */

/**
 * @typedef updateMedicalProfile
 * @property {string} medicalStoreId - Enter medicalStoreId [required] - _id of Medical Store
 * @property {string} storeName - Enter storeName [optional]
 * @property {string} ownerName - Enter ownerName [optional]
 * @property {string} ownerDOB:- Enter owner date of birth [optional]
 * @property {string} email - Enter email address [optional]
 * @property {string} address1 - Enter address1 [optional]
 * @property {string} address2 - Enter address2 [optional]
 * @property {string} area - Enter area [optional]
 * @property {number} pincode:- Enter pincode [optional]
 * @property {string} city - Enter city [optional]
 * @property {string} state - Enter state [optional]
 * @property {string} country - Enter country [optional]
 * @property {number} mobileNumber - Enter mobileNumber [optional] - eg: 95659896
 */
router.post("/updateMedicalInfo", requestHandler(editMedicalInfoController));
module.exports = router;
