const express = require("express");

const registerController = require("../../controllers/medicalStore/user/register");
const loginController = require("../../controllers/medicalStore/user/login");
const logoutController = require("../../controllers/medicalStore/user/logout");
const getProfileController = require("../../controllers/medicalStore/user/getProfile");
const updateProfileController = require("../../controllers/medicalStore/user/updateProfile");

const createAddressController = require("../../controllers/app/user/address/createAddress");
const deleteAddressController = require("../../controllers/app/user/address/deleteAddress");
const editAddressController = require("../../controllers/app/user/address/editAddress");
const getAddressController = require("../../controllers/app/user/address/getAddress");
const getAddressListController = require("../../controllers/app/user/address/getAddressList");
const setDefaultAddressController = require("../../controllers/app/user/address/setDefaultAddress");

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
 * API for create Address
 * @route POST /medicalStore/auth/address/create
 * @group Medical Store Api [Auth]
 * @param {createAddress.model} Data.body.required - create Address
 * @returns {object} 200 - Successful
 * @returns {Error}  default - Unexpected error
 * @security JWT
 */
/**
 * @typedef createAddress
 * @property {string} address1 - Enter address1 [required] - eg: 414, xyz complex
 * @property {string} address2 - Enter address2 [optional] - eg: near balachadi
 * @property {number} pincode - Enter pincode [required] - eg: 396***
 * @property {string} city - Enter city [required] - eg: surat
 * @property {string} state - Enter state [required] - eg: gujarat
 * @property {string} country - Enter country [required] - eg: india
 *
 */
router.post("/address/create", requestHandler(createAddressController));

/**
 * API for getProfile
 * @route GET /medicalStore/auth/address/getAddressList
 * @group Medical Store Api [Auth]
 * @returns {object} 200 - Successful
 * @returns {Error}  default - Unexpected error
 * @security JWT
 */
router.get("/address/getAddressList", requestHandler(getAddressListController));

/**
 * API for getAddress
 * @route GET /medicalStore/auth/address/getAddress
 * @group Medical Store Api [Auth]
 * @returns {object} 200 - Successful
 * @returns {Error}  default - Unexpected error
 * @security JWT
 */

/**
 * @typedef getAddress
 * @property {string} addressId - Enter addressId [required] - eg: 5c51cs54***
 *
 */
router.get("/address/getAddress", requestHandler(getAddressController));
/**
 * API for update Address
 * @route POST /medicalStore/auth/address/update
 * @group Medical Store Api [Auth]
 * @param {updateAddress.model} Data.body.required - create Address
 * @returns {object} 200 - Successful
 * @returns {Error}  default - Unexpected error
 * @security JWT
 */
/**
 * @typedef updateAddress
 * @property {string} addressId - Enter addressId [required] - eg: 5c51cs54***
 * @property {string} address1 - Enter address1 [required] - eg: 414, xyz complex
 * @property {string} address2 - Enter address2 [optional] - eg: near balachadi
 * @property {number} pincode - Enter pincode [required] - eg: 396***
 * @property {string} city - Enter city [required] - eg: surat
 * @property {string} state - Enter state [required] - eg: gujarat
 * @property {string} country - Enter country [required] - eg: india
 *
 */
router.post("/address/update", requestHandler(editAddressController));

/**
 * API for delete Address
 * @route POST /medicalStore/auth/address/delete
 * @group Medical Store Api [Auth]
 * @param {deleteAddress.model} Data.body.required - create Address
 * @returns {object} 200 - Successful
 * @returns {Error}  default - Unexpected error
 * @security JWT
 */
/**
 * @typedef deleteAddress
 * @property {string} addressId - Enter addressId [required] - eg: 5c51cs54***
 *
 */
router.post("/address/delete", requestHandler(deleteAddressController));

/**
 * API for setDefault Address
 * @route POST /medicalStore/auth/address/setDefault
 * @group Medical Store Api [Auth]
 * @param {setDefaultAddress.model} Data.body.required - create Address
 * @returns {object} 200 - Successful
 * @returns {Error}  default - Unexpected error
 * @security JWT
 */
/**
 * @typedef setDefaultAddress
 * @property {string} addressId - Enter addressId [required] - eg: 5c51cs54***
 *
 */
router.post("/address/setDefault", requestHandler(setDefaultAddressController));

module.exports = router;
