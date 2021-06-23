const joi = require('joi');
const httpStatus = require('http-status');

const mongo = require('../../../config/mongodb');
const ApiError = require('../../../utils/ApiError');
const auth = require('../../../utils/auth');
const CUSTOM_MESSAGE = require('../../../utils/message')

async function handler({
    user
}) {
    let { userId } = user;

    let userData = await mongo.ggDb.model(mongo.models.users).findOne({
        query: {
            _id: userId
        },
        select: { updatedAt: false }
    })
    console.log("Dasboard : getUserInfo : userData : ", JSON.stringify(userData))
    if (!userData) {
        throw new ApiError(httpStatus.BAD_REQUEST, CUSTOM_MESSAGE.USER_NOT_FOUND)
    }

    return userData;
}

module.exports = {
    handler,
    auth: true
}