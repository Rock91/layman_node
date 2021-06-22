const joi = require('joi');
const httpStatus = require('http-status');

const mongo = require('../../../config/mongodb');
const ApiError = require('../../../utils/ApiError');
const otp = require('../../../utils/otp');
const moment = require('moment');
const config = require('../../../config/config');
const CUSTOM_MESSAGE = require('../../../utils/message')

const payload = {
    body: joi.object().keys({
        id: joi.string().required()
    })
};

async function handler({
    body
}) {
    let { id } = body;

    let OtpInfo = await mongo.ggDb.model(mongo.models.otps).findOne({
        query: {
            _id: id,
            type: 'Login_otp'
        }
    })
    console.log("\n User : resend Otp : OtpInfo ::", JSON.stringify(OtpInfo))
    if (!OtpInfo)
        throw new ApiError(httpStatus.BAD_REQUEST, CUSTOM_MESSAGE.OTP_NOT_FOUND);

    if (OtpInfo.verify)
        throw new ApiError(httpStatus.BAD_REQUEST, CUSTOM_MESSAGE.OTP_ALREADY_VERIFYRD);

    // let otpNumber =  Math.floor(Math.random() * (999999 - 111111 + 1) ) + 111111;
    let otpNumber = otp.generateOTP(4)
    otpNumber = 4321;

    var mobileNumber = OtpInfo.countryCode + OtpInfo.mobileNumber;

    // let sendOtpRes = await otp.sendOTP(mobileNumber, otpNumber)
    // console.log("\nUser : resend otp : resend OTP Res ::",JSON.stringify(sendOtpRes))

    // if(!sendOtpRes){
    //     throw new ApiError(httpStatus.BAD_REQUEST, CUSTOM_MESSAGE.RESEND_OTP );
    // }
    const expiresOtp = moment().add((config.OTP_ExpirationTimeInSecond / 60), 'minutes').format();
    let Otp = await mongo.ggDb.model(mongo.models.otps).findOneAndUpdate({
        query: {
            _id: id
        },
        update: {
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
    // console.log("\nUser : resend otp : updateRes  sendData::",JSON.stringify(sendData))
    sendData.msg = CUSTOM_MESSAGE.SEND_OTP_SUCESSFULLY;
    return sendData;
}

module.exports = {
    payload,
    handler,
    auth: false
}