// const aws = require('aws-sdk');

const config = require('../config/config');

// let awsConfig = {
//     region: config.AWS.region,
//     apiVersion: config.AWS.apiVersion,
//     accessKeyId: config.AWS.accessKeyId,
//     secretAccessKey: config.AWS.secretAccessKey,
// }
// console.log("Send otp config :  ", awsConfig)
// aws.config.update(awsConfig);
// const SNS = new aws.SNS();

function generateOTP(otpLength) {
    var digits = '0123456789';
    var otp = '';
    for (let i = 1; i <= otpLength; i++) {
        var index = Math.floor(Math.random() * (digits.length));
        otp = otp + digits[index];
    }
    return otp;
}

// function sendOTP(to, msg) {
//     console.log("send OTP : to : ", to)
//     console.log("send OTP : data : ", msg)
// return new Promise(async resolve => {

//     // Create sendEmail params

//     var params = {
//         attributes: {
//             'DefaultSMSType': 'Transactional',
//             'DefaultSenderID': 'DIPREPORT'
//         }
//     };
//     var setSMSTypePromise = SNS.setSMSAttributes(params).promise();

//     setSMSTypePromise.then(
//         function (data) {
//             var params = {
//                 Message: msg + ' is your one time password to proceed on GoodGamer. It is valid for 30 seconds. Do not share your OTP with anyone.',
//                 MessageStructure: 'string',
//                 // PhoneNumber: '+911234567890'
//                 PhoneNumber: to
//             };
//             var publishTextPromise = SNS.publish(params).promise();

//             publishTextPromise.then(
//                 function (data) {
//                     console.log("MessageID sendMessage is " + data.MessageId);
//                     resolve(true)
//                 }).catch(
//                     function (err) {
//                         console.error(err, err.stack);
//                         resolve(false)
//                     });

//         }).catch(
//             function (err) {
//                 console.error(err, err.stack);
//             });
// })
// }

// function sendforgetPasswordOTP(to, link) {
//     console.log("send OTP : to : ", to)
//     return new Promise(async resolve => {

//         // Create sendEmail params

//         var params = {
//             attributes: {
//                 'DefaultSMSType': 'Transactional',
//                 'DefaultSenderID': 'DIPREPORT'
//             }
//         };
//         var setSMSTypePromise = SNS.setSMSAttributes(params).promise();

//         setSMSTypePromise.then(
//             function (data) {
//                 var params = {
//                     Message: "forgot Password link is " + link,
//                     MessageStructure: 'string',
//                     PhoneNumber: to
//                 };
//                 var publishTextPromise = SNS.publish(params).promise();

//                 publishTextPromise.then(
//                     function (data) {
//                         console.log("MessageID sendMessage is ", JSON.stringify(data));
//                         console.log("MessageID sendMessage is " + data.MessageId);
//                         resolve(true)
//                     }).catch(
//                         function (err) {
//                             console.error(err, err.stack);
//                             resolve(false)
//                         });

//             }).catch(
//                 function (err) {
//                     console.error(err, err.stack);
//                 });
//     })
// }
module.exports = {
    generateOTP,
    // sendOTP,
    // sendforgetPasswordOTP
}