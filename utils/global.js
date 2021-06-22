
const mongo = require('../config/mongodb');

async function generateId(otpLength) {
    var digits = '000000000';
    var otp = '';
    for (let i = 1; i <= otpLength; i++) {
        var index = Math.floor(Math.random() * (digits.length));
        otp = otp + digits[index];
    }
    return otp;
}
module.exports = {
    generateId,
    // sendOTP,
    // sendforgetPasswordOTP
}