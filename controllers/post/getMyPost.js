const joi        = require('joi');
const httpStatus = require('http-status');

const mongo    = require('../../config/mongodb');
const ApiError = require('../../utils/ApiError');
const auth     = require('../../utils/auth');
const CUSTOM_MESSAGE = require('../../utils/message');


async function handler({
    user
}) {
    let { userId } = user;

    let postData = await mongo.ggDb.model(mongo.models.posts).find({
        query  : {
            user: userId
        },
        select:{updatedAt:false,isDeleted:false},
        populate:[{path:"crby", select:"username firstName lastName"}]
    })
    if (!postData) {
        throw new ApiError(httpStatus.BAD_REQUEST, CUSTOM_MESSAGE.POST_NOT_FOUND)
    }
    postData.msg = CUSTOM_MESSAGE.ALL_POST
    return postData;
}

module.exports = {
    handler,
    auth : true
}