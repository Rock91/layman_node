const joi = require('joi');
const httpStatus = require('http-status');
const moment = require('moment');

const mongo = require('../../../config/mongodb');
const ApiError = require('../../../utils/ApiError');
const auth = require('../../../utils/auth')
const otp = require('../../../utils/otp');
const config = require('../../../config/config');

const CUSTOM_MESSAGE = require('../../../utils/message');

const payload = {
    body: joi.object().keys({
        mobile: joi.number().min(9).max(15).required(),
        countryCode: joi.string().required(),
    })
};

async function handler({
    body
}) {
    console.log("login: body: ", body)
    let { mobile, countryCode } = body;

    let mobileNumber = countryCode + mobile;
    let user = await mongo.ggDb.model(mongo.models.users).findOne({
        query: { mobileNumber: mobileNumber },
        select: { isBlock: 1, mobileNumber: 1 }
    })
    if (user && user.isBlock) {
        throw new ApiError(httpStatus.BAD_REQUEST, CUSTOM_MESSAGE.YOU_ARE_BLOCKED)
    }
    let otpNumber = otp.generateOTP(4)
    otpNumber = 1234  /// static OTP
    // let sendOtpRes = await otp.sendOTP(mobileNumber, otpNumber);
    const expiresOtp = moment().add((config.OTP_ExpirationTimeInSecond / 60), 'minutes');
    let Otp = await mongo.ggDb.model(mongo.models.otps).findOneAndUpdate({
        query: {
            mobileNumber: mobile,
            type: 'Login_otp'
        },
        update: {
            mobileNumber: mobile,
            countryCode: countryCode,
            token: otpNumber,
            type: 'Login_otp',
            verify: false,
            expires: expiresOtp
        },
        options: {
            upsert: true,
            new: true
        }
    });
    var sendData = {
        id: Otp._id,
        expireTime: config.OTP_ExpirationTimeInSecond
    };
    console.log("User : send otp : updateRes  sendData::", JSON.stringify(sendData))
    sendData.msg = CUSTOM_MESSAGE.SEND_OTP_SUCESSFULLY;
    return sendData;
    // return { user: user, token: token };
}

module.exports = { payload, handler }