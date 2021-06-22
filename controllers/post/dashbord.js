const joi = require('joi');
const httpStatus = require('http-status');

const mongo = require('../../config/mongodb');
const ApiError = require('../../utils/ApiError');
const auth = require('../../utils/auth');
const CUSTOM_MESSAGE = require('../../utils/message');


async function handler({
    user
}) {
    let postData = {
        TotalPost: 0,
        TotalActivePost: 0,
        TotalInActivePost: 0,
        TotalDeletedPost: 0
    }
    let getPostData = await mongo.ggDb.model(mongo.models.posts).find({
        query: {},
        select: { isActive: 1, isDeleted: 1 }
    })
    postData.TotalPost = getPostData.length
    postData.forEach(post => {
        if (isActive)
            TotalActivePost = TotalActivePost + 1
        if (isDeleted)
            TotalDeletedPost = TotalDeletedPost + 1
        if (!isActive)
            TotalInActivePost = TotalInActivePost + 1

    });
    postData.msg = "dashBord Data"
    return postData;
}

module.exports = {
    handler,
    auth: true
}