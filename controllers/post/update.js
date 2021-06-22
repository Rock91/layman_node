const joi        = require('joi');
const httpStatus = require('http-status');

const mongo    = require('../../config/mongodb');
const ApiError = require('../../utils/ApiError');
const auth     = require('../../utils/auth');
const CUSTOM_MESSAGE = require('../../utils/message')
const payload = {
    body: joi.object().keys({
        postId  : joi.string().required(),
        title   : joi.string(), 
        content : joi.string(), 
        isActive: joi.boolean(),
        latitute     : joi.string(),
        longitude    : joi.string(),
    })
};

async function handler({
    body,
    user
}) {
    let { postId, title, content, latitute, longitude,isActive } = body;
    let { userId } = user
    // console.log("\nSDK : User : updateProfille : ",JSON.stringify(body))
    if((latitute && !longitude)||(!latitute && longitude))
        throw new ApiError(httpStatus.BAD_REQUEST, CUSTOM_MESSAGE.LAT_AND_LONG_REQUIRE)

    let userExist = await mongo.ggDb.model(mongo.models.users).findOne({query:{_id:userId}})
    if (!userExist)
        throw new ApiError(httpStatus.BAD_REQUEST, CUSTOM_MESSAGE.USER_NOT_FOUND)
    let postExist = await mongo.ggDb.model(mongo.models.posts).findOne({ query  :  { _id: postId, user: userId} })
    if(!postExist)
        throw new ApiError(httpStatus.BAD_REQUEST, CUSTOM_MESSAGE.NOT_PERMITTED_FOR_UPDATE)
   
    let update = {}
    if(title)
        update.title = title
    if(content)
        update.content = content
    if(latitute && longitude)
        update.location = [longitude, latitute]
    if(isActive == false || isActive == true )
        update.isActive = isActive    
        
    let updateRes = await mongo.ggDb.model(mongo.models.posts).findOneAndUpdate({
        query  : {
            _id: postId
        },
        update:update,
        options:{
            new : true
        }
    })
    // console.log("\nSDK : User : Profile : updateRes ::",JSON.stringify(updateRes))
    updateRes.msg = CUSTOM_MESSAGE.POST_UPDATED;
    return updateRes;
}

module.exports = {
    payload,
    handler,
    auth: true
}