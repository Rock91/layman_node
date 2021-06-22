const joi = require('joi');
const httpStatus = require('http-status');

const mongo = require('../../../config/mongodb');
const ApiError = require('../../../utils/ApiError');
const auth = require('../../../utils/auth');
const CUSTOM_MESSAGE = require('../../../utils/message')

const payload = {
    body: joi.object().keys({
        email: joi.string().email(),
        firstName: joi.string(),
        lastName: joi.string(),
        username: joi.string(),
    })
};

async function handler({
    body,
    user
}) {
    let { email, firstName, lastName, username } = body;
    let { userId } = user
    // console.log("\nSDK : User : updateProfille : ",JSON.stringify(body))

    let UserInfo = await mongo.ggDb.model(mongo.models.users).findOne({
        query: { _id: userId }
    })

    console.log("\nSDK : User : updateProfille : UserInfo ::", JSON.stringify(UserInfo))
    if (!UserInfo)
        throw new ApiError(httpStatus.BAD_REQUEST, CUSTOM_MESSAGE.USER_NOT_FOUND)
    if (email) {
        let EmailInfo = await mongo.ggDb.model(mongo.models.users).findOne({
            query: { email: email }
        })
        if ((EmailInfo) && (EmailInfo.email != UserInfo.email))
            throw new ApiError(httpStatus.BAD_REQUEST, CUSTOM_MESSAGE.EMAIL_ALREADY_EXISTS)
    }
    if (username) {
        let usernameInfo = await mongo.ggDb.model(mongo.models.users).findOne({
            query: { username: username }
        })
        if ((usernameInfo) && (usernameInfo.username != UserInfo.username))
            throw new ApiError(httpStatus.BAD_REQUEST, CUSTOM_MESSAGE.USER_ALREADY_EXISTS)
    }
    let update = {}
    if (email)
        update.email = email
    if (firstName)
        update.firstName = firstName
    if (lastName)
        update.lastName = lastName
    if (username)
        update.username = username

    let updateRes = await mongo.ggDb.model(mongo.models.users).findOneAndUpdate({
        query: {
            _id: userId
        },
        update: update,
        options: {
            new: true
        }
    })
    // console.log("\nSDK : User : Profile : updateRes ::",JSON.stringify(updateRes))
    updateRes.msg = CUSTOM_MESSAGE.USER_PROFILE_UPDATED;
    return updateRes;
}

module.exports = {
    payload,
    handler,
    auth: true
}