const joi = require('joi');
const httpStatus = require('http-status');


const mongo = require('../../../../config/mongodb');
const ApiError = require('../../../../utils/ApiError');
const auth = require('../../../../utils/auth');
const CUSTOM_MESSAGE = require('../../../../utils/message')


const payload = {
    body: joi.object().keys({
        addressId: joi.string().required(),
        address1: joi.string().optional(),
        address2: joi.string().optional(),
        area: joi.string().optional(),
        pincode: joi.string().optional(),
        city: joi.string().optional(),
        state: joi.string().optional(),
        country: joi.string().optional(),
    })
};

async function handler({
    body,user
}) {
    let { addressId ,address1, address2, area, pincode, city, state, country } = body;
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
    let updateNewAddress = {}
    if(address1)
       updateNewAddress.address1 = address1 
    if(address2)
       updateNewAddress.address2 = address2 
    if(area)
       updateNewAddress.area = area 
    if(pincode)
       updateNewAddress.pincode = pincode 
    if(city)
       updateNewAddress.city = city 
    if(state)
       updateNewAddress.state = state 
    if(country) 
        updateNewAddress.country = country 

    userAddress = await mongo.ggDb.model(mongo.models.address).findOneAndUpdate({
        query: {
            _id: addressId,
            user: userId,
            isDeleted : false
        },
        update: updateNewAddress,
        options:{ new:true},
        sort:{ isDefault: 1, createAt:1}
    })

    return {msg:"user Address updated!",address:userAddress};
}

module.exports = {
    payload,
    handler,
    auth: true
}