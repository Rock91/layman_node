const joi = require('joi');
const httpStatus = require('http-status');

const mongo = require('../../../../config/mongodb');
const ApiError = require('../../../../utils/ApiError');
const auth = require('../../../../utils/auth');
const CUSTOM_MESSAGE = require('../../../../utils/message')


const payload = {
    body: joi.object().keys({
        address1: joi.string().required(),
        address2: joi.string().optional(),
        area: joi.string().required(),
        pincode: joi.string().required(),
        city: joi.string().required(),
        state: joi.string().required(),
        country: joi.string().required(),
    })
};

async function handler({
    body,user
}) {
    let { address1, address2, area, pincode, city, state, country } = body;
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

    let insertAddress = {
        address1, area, pincode, city, state, country 
    }
    if(address2)
       insertAddress.address2 = address2 
        
    let userAddress = await mongo.ggDb.model(mongo.models.address).insertOne({
        document: updateNewAddress
    })

    return {msg:"user Address inserted!",address:userAddress};
}

module.exports = {
    payload,
    handler,
    auth: true
}