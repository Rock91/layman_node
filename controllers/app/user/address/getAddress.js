const joi = require('joi');
const httpStatus = require('http-status');

const mongo = require('../../../../config/mongodb');
const ApiError = require('../../../../utils/ApiError');
const auth = require('../../../../utils/auth');
const CUSTOM_MESSAGE = require('../../../../utils/message')

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
    if (!userData) {
        throw new ApiError(httpStatus.BAD_REQUEST, CUSTOM_MESSAGE.USER_NOT_FOUND)
    }
    let userAddress = await mongo.ggDb.model(mongo.models.address).find({
        query: {
            user: userId,
            isDeleted : false
        },
        select: { updatedAt: false },
        sort:{ isDefault: 1, createAt:1}
    })

    return {msg:"user Address list!",address:userAddress};
}

module.exports = {
    handler,
    auth: true
}