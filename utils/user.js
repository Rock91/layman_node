
const mongo = require('../config/mongodb');
const globalFunction = require('./global')

async function generateUser(userData) {
    let { mobileNumber, countryCode } = userData
    let userId = await couter.getId("user");
    let preuserId = await globalFunction.generateId(4 - userId.toString().length);
    userId = "GUEST" + preuserId + userId;
    userData = {
        mobileNumber: mobileNumber,
        countryCode: countryCode,
        username: userId
    }
    let UserInfo = await mongo.ggDb.model(mongo.models.users).insertOne({
        document: userData
    });
    return UserInfo;
}

module.exports = {
    generateUser,
    // sendOTP,
    // sendforgetPasswordOTP
}