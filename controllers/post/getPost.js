const joi        = require('joi');
const httpStatus = require('http-status');

const mongo    = require('../../config/mongodb');
const ApiError = require('../../utils/ApiError');
const auth     = require('../../utils/auth');
const CUSTOM_MESSAGE = require('../../utils/message');

const payload = {
    query: joi.object().keys({
        latitute     : joi.string().required(),
        longitude    : joi.string().required(),
    })
};

async function handler({
    query,
    user
}) {
    let { latitute, longitude } = query;
    let { userId } = user;
    let postData = await mongo.ggDb.model(mongo.models.posts).find({
        query:{
            location2: {
                $near: {
                    $geometry:{ 
                        type: "Point", 
                        coordinates: [latitute, longitude]
                    }
                }
            },
            isActive: true,
            isDeleted: false
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
    payload,
    handler,
    auth : true
}