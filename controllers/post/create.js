const joi        = require('joi');
const httpStatus = require('http-status');

const mongo    = require('../../config/mongodb');
const ApiError = require('../../utils/ApiError');
const auth = require('../../utils/auth')

const CUSTOM_MESSAGE = require('../../utils/message');

const payload = {
    body: joi.object().keys({
        title    : joi.string().required(), 
        content  : joi.string().required(), 
        latitute     : joi.string().required(),
        longitude    : joi.string().required(),
    }),
};

async function handler({
    body, user
}) {
    let { title, content, latitute, longitude } = body;
    let { userId } = user

    let userExist = await mongo.ggDb.model(mongo.models.users).findOne({query:{_id:userId}})
    if(!userExist)
        throw new ApiError(httpStatus.BAD_REQUEST, CUSTOM_MESSAGE.NO_USER_FOUND )
    let query = {
        title:title,
        content: content,
        location: [longitude, latitute],
        location2:{type: "Point",coordinates:[longitude, latitute]},
        crby: userId
        }
    let newPost = await mongo.ggDb.model(mongo.models.posts).insertOne({
        document : query
    });
    newPost =  newPost._doc;
    return { post: newPost , msg:CUSTOM_MESSAGE.POST_CREATED };
}

module.exports = { payload, handler ,auth}
