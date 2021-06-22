const express = require('express')

const loginController = require('../../controllers/app/user/login')
const logoutController = require('../../controllers/app/user/logout')

const getProfileController = require('../../controllers/app/user/getProfile')
const updateProfileController = require('../../controllers/app/user/updateProfile');

const verifyOtpController = require('../../controllers/app/user/verifyOtp')
const reSendOtpController = require('../../controllers/app/user/reSendOtp')

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



module.exports = router;