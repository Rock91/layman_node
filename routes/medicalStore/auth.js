const express = require("express");

const registerController = require("../../controllers/medicalStore/user/register");
const loginController = require("../../controllers/medicalStore/user/login");
const logoutController = require("../../controllers/medicalStore/user/logout");
const getProfileController = require("../../controllers/medicalStore/user/getProfile");
const updateProfileController = require("../../controllers/medicalStore/user/updateProfile");

const addMedicalManagerController = require("../../controllers/medicalStore/user/addManager");

const requestHandler = require("../../middlewares/requestHandler");

const router = express.Router();

router.get("/", (req, res) => {
  res.send(req.originalUrl);
});

/**
 * API for register Medical Store
 * @route POST /medicalStore/auth/register
 * @group Medical Store Api [Auth]
 * @param {registerMedicalStore.model} Data.body.required - register Medical Store
 * @returns {object} 200 - Successful
 * @returns {Error}  default - Unexpected error
 */
/**
 * @typedef registerMedicalStore
 * @property {email} email - User email [required] - eg: ronak.sutariya@mail.in
 * @property {string} firstName - User firstName [required] - eg: ronak
 * @property {string} lastName - User lastName [required] - eg: sutariya
 * @property {string} storeName - User storeName [required] - eg: Home
 * @property {number} mobileNumber - User mobileNumber [required] - eg: 98554846
 * @property {string} password - User password [required] - eg: ronak485
 */

router.post("/register", requestHandler(registerController));

/**
 * API for Login
 * @route POST /medicalStore/auth/login
 * @group Medical Store Api [Auth]
 * @param {login.model} Data.body.required - Login data
 * @returns {object} 200 - Successful
 * @returns {Error}  default - Unexpected error
 */

/**
 * @typedef login
 * @property {email} email - User email [required] - eg: ronak.sutariya@mail.in
 * @property {string} password - User password [required] - eg: ronak485
 */

router.post("/login", requestHandler(loginController));

/**
 * API for Logout
 * @route get /medicalStore/auth/Logout
 * @group Medical Store Api [Auth]
 * @param {Logout.model} Data.body.required - Logout data
 * @returns {object} 200 - Successful
 * @returns {Error}  default - Unexpected error
 * @security JWT
 */

router.get("/logout", requestHandler(logoutController));

/**
 * API for getProfile
 * @route GET /medicalStore/auth/getProfile
 * @group Medical Store Api [Auth]
 * @returns {object} 200 - Successful
 * @returns {Error}  default - Unexpected error
 * @security JWT
 */
router.get("/getProfile", requestHandler(getProfileController));

/**
 * API for Update Profile
 * @route POST /medicalStore/auth/updateProfile
 * @group Medical Store Api [Auth]
 * @param {updateMedicalProfile.model} Data.body.required - Update Profile
 * @returns {object} 200 - Successful
 * @returns {Error}  default - Unexpected error
 * @security JWT
 */

/**
 * @typedef updateMedicalProfile
 * @property {string} firstName - Enter First Name [optional] - eg: example
 * @property {string} lastName - Enter Last Name [optional] - eg: example
 * @property {number} mobileNumber - Enter mobileNumber [optional] - eg: 95659896
 */
router.post("/updateProfile", requestHandler(updateProfileController));

/**
 * API for add Medical Manager for Medical Store
 * @route POST /medicalStore/auth/addMedicalManager
 * @group Medical Store Api [Auth]
 * @param {addMedicalManager.model} Data.body.required - add Medical Manager for Medical Store
 * @returns {object} 200 - Successful
 * @returns {Error}  default - Unexpected error
 */
/**
 * @typedef addMedicalManager
 * @property {email} email - User email [required] - eg: ronak.sutariya@mail.in
 * @property {string} firstName - User firstName [required] - eg: ronak
 * @property {string} lastName - User lastName [required] - eg: sutariya
 * @property {string} password - User password [required] - eg: ronak485
 */

router.post("/addMedicalManager", requestHandler(addMedicalManagerController));

module.exports = router;
