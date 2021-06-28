const express = require("express");

const addMedicalManagerController = require("../../controllers/medicalStore/Manager/addManager");
const updateMedicalManagerController = require("../../controllers/medicalStore/Manager/editManager");
const getMedicalManagerListController = require("../../controllers/medicalStore/Manager/getManagerList");
const deleteMedicalManagerController = require("../../controllers/medicalStore/Manager/deleteManager");

const requestHandler = require("../../middlewares/requestHandler");

const router = express.Router();

router.get("/", (req, res) => {
  res.send(req.originalUrl);
});

/**
 * API for add Medical Manager for Medical Store
 * @route POST /medicalStore/manager/addMedicalManager
 * @group Medical Store Api [Medical Manager]
 * @param {addMedicalManager.model} Data.body.required - add Medical Manager for Medical Store
 * @returns {object} 200 - Successful
 * @returns {Error}  default - Unexpected error
 * @security JWT
 */
/**
 * @typedef addMedicalManager
 * @property {email} email - User email [required] - eg: ronak.sutariya@mail.in
 * @property {string} firstName - User firstName [required] - eg: ronak
 * @property {string} lastName - User lastName [required] - eg: sutariya
 * @property {string} password - User password [required] - eg: ronak485
 */

router.post("/addMedicalManager", requestHandler(addMedicalManagerController));

/**
 * API for update Medical Manager for Medical Store
 * @route POST /medicalStore/manager/updateMedicalManager
 * @group Medical Store Api [Medical Manager]
 * @param {addMedicalManager.model} Data.body.required - update Medical Manager for Medical Store
 * @returns {object} 200 - Successful
 * @returns {Error}  default - Unexpected error
 * @security JWT
 */
/**
 * @typedef addMedicalManager
 * @property {string} managerId - ManagerId [required] - eg: 5284csdfsfd
 * @property {email} email - User email [optional] - eg: ronak.sutariya@mail.in
 * @property {string} firstName - User firstName [optional] - eg: ronak
 * @property {string} lastName - User lastName [optional] - eg: sutariya
 * @property {string} password - User password [optional] - eg: ronak485
 */

router.post(
  "/updateMedicalManager",
  requestHandler(updateMedicalManagerController)
);

/**
 * API for get Medical Manager for Medical Store
 * @route get /manager/manager/getMedicalManagerList
 * @group Medical Store Api [Medical Manager]
 * @param {Logout.model} Data.body.required -  get Medical Manager for Medical Store
 * @returns {object} 200 - Successful
 * @returns {Error}  default - Unexpected error
 * @security JWT
 */

router.get(
  "/getMedicalManagerList",
  requestHandler(getMedicalManagerListController)
);

/**
 * API for delete Medical Manager for Medical Store
 * @route POST /medicalStore/manager/deleteMedicalManager
 * @group Medical Store Api [Medical Manager]
 * @param {deleteMedicalManager.model} Data.body.required - for delet eMedical Manager Medical Store
 * @returns {object} 200 - Successful
 * @returns {Error}  default - Unexpected error
 * @security JWT
 */

/**
 * @typedef deleteMedicalManager
 * @property {string} managerId - managerId [required] - eg: 52asdad5
 */

router.post(
  "/deleteMedicalManager",
  requestHandler(deleteMedicalManagerController)
);

module.exports = router;
