const joi = require('joi');
const httpStatus = require('http-status');

const mongo = require('../../../config/mongodb');
const ApiError = require('../../../utils/ApiError');
const CUSTOM_MESSAGE = require('../../../utils/message');
const userFunction = require('../../../utils/user');
const auth = require('../../../utils/auth')

const payload = {
    body: joi.object().keys({
        otp: joi.number().min(3).required(),
        id: joi.string().required(),
    })
};

async function handler({
    body
}) {
    let { otp, id } = body;
    let OtpInfo = await mongo.ggDb.model(mongo.models.otps).findOne({
        query: {
            _id: mongo.ObjectId(id),
            token: otp,
            verify: false,
            type: 'Login_otp'
        }
    })
    console.log(" User : Verify Otp : OtpInfo ::", JSON.stringify(OtpInfo))
    if (!OtpInfo)
        throw new ApiError(httpStatus.BAD_REQUEST, CUSTOM_MESSAGE.WRONG_OTP);

    console.log('---------------------- otp time ----new Date().getTime()--', new Date())
    console.log('---------------------- otp time ----Verify--', new Date(OtpInfo.expires) > new Date())
    let diffInSec = await GetTimeDifference(new Date(), new Date(OtpInfo.expires));
    if (diffInSec <= 0/*new Date(OtpInfo.expires) > new Date()*/)
        throw new ApiError(httpStatus.BAD_REQUEST, CUSTOM_MESSAGE.OTP_EXPIRES);

    let Otp = await mongo.ggDb.model(mongo.models.otps).updateOne({
        query: {
            _id: id,
            token: otp,
            verify: false,
            type: 'Login_otp'
        },
        update: {
            verify: true
        },
        options: {
            new: true
        }
    });
    let generateUser = await userFunction.generateUser(OtpInfo)
    let { error, token } = await auth.generateTokenForUsers({ _id: generateUser._id, email: generateUser.mobileNumber, type: 'access' }, { expiresIn: 100000000/*2400 * 60 * 60*/ });
    console.log("login: error: ", error)
    if (error) {
        throw new ApiError(error);
    }
    var sendData = {
        user: generateUser,
        token: token
    };
    console.log("User : Verify otp : updateRes  sendData::", JSON.stringify(sendData))
    sendData.msg = CUSTOM_MESSAGE.OTP_VERIFYED;
    return sendData;
}

async function GetTimeDifference(startDate, endDate, type) {
    var date1 = new Date(startDate);
    var date2 = new Date(endDate);
    var diffMs = (date2 - date1); // milliseconds between now & Christmas
    if (type == 'day') {
        var timeDiff = Math.abs(date2.getTime() - date1.getTime());
        var diffDays = Math.floor(timeDiff / (1000 * 3600 * 24));
        return diffDays;
    } else if (type == 'hour') {
        return Math.round((diffMs % 86400000) / 3600000);
    } else if (type == 'minute') {
        return Math.round(((diffMs % 86400000) % 3600000) / 60000);
    } else {
        return Math.round((diffMs / 1000));
    }
}
module.exports = {
    payload,
    handler,
    auth: false
}