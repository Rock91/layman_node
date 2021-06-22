const joi        = require('joi');
const httpStatus = require('http-status');

const mongo    = require('../../config/mongodb');
const ApiError = require('../../utils/ApiError');
const auth     = require('../../utils/auth');
const CUSTOM_MESSAGE = require('../../utils/message');

const payload = {
    query: joi.object().keys({
        postId  : joi.string().required(),
    })
};

async function handler({
    query,user
}) {
    let { postId } = query;
    let { userId } = user;

    let postData = await mongo.ggDb.model(mongo.models.posts).findOne({
        query  : {
            user: userId,
            _id: mongo.ObjectId(postId)
        },
    })
    if (!postData) {
        throw new ApiError(httpStatus.BAD_REQUEST, CUSTOM_MESSAGE.POST_NOT_FOUND)
    }
    postData = await mongo.ggDb.model(mongo.models.posts).findOneAndUpdate({
        query  : {
            _id: mongo.ObjectId(postId)
        },
        update:{isDeleted: true},
        options:{new:true}
    })
    postData.msg = CUSTOM_MESSAGE.POST_REMOVED
    return postData;
}

module.exports = {
    payload,
    handler,
    auth : true
}