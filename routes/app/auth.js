const express = require('express')

const loginController = require('../../controllers/app/user/login')
const verifyOtpController = require('../../controllers/app/user/verifyOtp')
const reSendOtpController = require('../../controllers/app/user/reSendOtp')
const logoutController = require('../../controllers/app/user/logout')

const getProfileController = require('../../controllers/app/user/getProfile')
const updateProfileController = require('../../controllers/app/user/updateProfile');

const createAddressController = require('../../controllers/app/user/address/createAddress');
const deleteAddressController = require('../../controllers/app/user/address/deleteAddress');
const editAddressController = require('../../controllers/app/user/address/editAddress');
const getAddressController = require('../../controllers/app/user/address/getAddress');
const getAddressListController = require('../../controllers/app/user/address/getAddressList');
const setDefaultAddressController = require('../../controllers/app/user/address/setDefaultAddress');

const requestHandler = require('../../middlewares/requestHandler');

const router = express.Router();

router.get('/', (req, res) => {
  res.send(req.originalUrl);
});

/**
 * API for Login
 * @route POST /app/auth/login
 * @group APP Api [Auth]
 * @param {login.model} Data.body.required - Login data
 * @returns {object} 200 - Successful
 * @returns {Error}  default - Unexpected error
 */

/**
* @typedef login
* @property {number} mobile - User mobile [required] - eg: 9826856855
* @property {string} countryCode - User countryCode [required] - eg: +91
*/

router.post('/login', requestHandler(loginController));

/**
 * API for verify Otp
 * @route POST /app/auth/verifyOtp
 * @group APP Api [Auth]
 * @param {verifyOtp.model} Data.body.required - verifyOtp data
 * @returns {object} 200 - Successful
 * @returns {Error}  default - Unexpected error
 */

/**
* @typedef verifyOtp
* @property {string} id - otp id [required] - eg: 59dd56ada
* @property {number} otp - OTP [required] - eg: 1234
*/

router.post('/verifyOtp', requestHandler(verifyOtpController));

/**
 * API for verify Otp
 * @route POST /app/auth/reSendOtp
 * @group APP Api [Auth]
 * @param {reSendOtp.model} Data.body.required - reSendOtp data
 * @returns {object} 200 - Successful
 * @returns {Error}  default - Unexpected error
 */

/**
* @typedef reSendOtp
* @property {string} id - otp id [required] - eg: 59dd56ada
*/

router.post('/reSendOtp', requestHandler(reSendOtpController));

/**
 * API for Logout
 * @route get /app/auth/Logout
 * @group APP Api [Auth]
 * @param {Logout.model} Data.body.required - Logout data
 * @returns {object} 200 - Successful
 * @returns {Error}  default - Unexpected error
 * @security JWT
 */

router.get('/logout', requestHandler(logoutController));

/**
 * API for Update Profile
 * @route POST /app/auth/updateProfile
 * @group APP Api [Auth]
 * @param {updateProfile.model} Data.body.required - Update Profile
 * @returns {object} 200 - Successful
 * @returns {Error}  default - Unexpected error
 * @security JWT
 */

/**
 * @typedef updateProfile
 * @property {string} email - Enter Email [optional] - eg: ronak@gmail.in
 * @property {string} firstName - Enter First Name [optional] - eg: example
 * @property {string} lastName - Enter Last Name [optional] - eg: example
 * @property {string} username - Enter userName [optional] - eg: username
 */
router.post('/updateProfile', requestHandler(updateProfileController));

/**
 * API for getProfile
 * @route GET /app/auth/getProfile
 * @group APP Api [Auth]
 * @returns {object} 200 - Successful
 * @returns {Error}  default - Unexpected error
 * @security JWT
 */
router.get('/getProfile', requestHandler(getProfileController));

/**
 * API for create Address
 * @route POST /app/auth/address/create
 * @group APP Api [Auth]
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
router.post('/address/create', requestHandler(createAddressController));

/**
 * API for getProfile
 * @route GET /app/auth/address/getAddressList
 * @group APP Api [Auth]
 * @returns {object} 200 - Successful
 * @returns {Error}  default - Unexpected error
 * @security JWT
 */
router.get('/address/getAddressList', requestHandler(getAddressListController));

/**
 * API for getAddress
 * @route GET /app/auth/address/getAddress
 * @group APP Api [Auth]
 * @returns {object} 200 - Successful
 * @returns {Error}  default - Unexpected error
 * @security JWT
 */

/**
 * @typedef getAddress
 * @property {string} addressId - Enter addressId [required] - eg: 5c51cs54***
 * 
 */
router.get('/address/getAddress', requestHandler(getAddressController));
/**
 * API for update Address
 * @route POST /app/auth/address/update
 * @group APP Api [Auth]
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
router.post('/address/update', requestHandler(editAddressController));

/**
 * API for delete Address
 * @route POST /app/auth/address/delete
 * @group APP Api [Auth]
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
router.post('/address/delete', requestHandler(deleteAddressController));

/**
 * API for setDefault Address
 * @route POST /app/auth/address/setDefault
 * @group APP Api [Auth]
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
router.post('/address/setDefault', requestHandler(setDefaultAddressController));

module.exports = router;