const joi = require('joi');
const httpStatus = require('http-status');

const mongo = require('../../../../config/mongodb');
const ApiError = require('../../../../utils/ApiError');
const auth = require('../../../../utils/auth');
const CUSTOM_MESSAGE = require('../../../../utils/message')

const payload = {
    body: joi.object().keys({
        addressId: joi.string().required(),
    })
};

async function handler({
    body,user
}) {
    let { addressId } = body;
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
    let userAddress = await mongo.ggDb.model(mongo.models.address).findOne({
        query: {
            _id: addressId,
            user: userId,
            isDeleted : false
        },
        select: { updatedAt: false },
        sort:{ isDefault: 1, createAt:1}
    })

    if(!userAddress)
        throw new ApiError(httpStatus.BAD_REQUEST, CUSTOM_MESSAGE.USER_ADDRESS_NOT_FOUND)

    await mongo.ggDb.model(mongo.models.address).findOneAndUpdate({
        query: {
            _id: addressId,
            user: userId,
            isDeleted : false
        },
        update: {isDeleted: true},
        options:{ new:true}
    })

    return {msg:"user Address is Deleted!"};
}

module.exports = {
    payload,
    handler,
    auth: true
}