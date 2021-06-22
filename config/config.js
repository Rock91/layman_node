const dotenv = require('dotenv');
const path = require('path');
const Joi = require('joi');
const ApiError = require('../utils/ApiError');

dotenv.config({
    path: path.join(__dirname, '../.env')
});

const envVarsSchema = Joi.object()
    .keys({
        NODE_ENV: Joi.string().valid('production', 'development', 'test').required(),
        PORT: Joi.number().default(3000),
        MONGODB_URL: Joi.string().required().description('Mongo DB url'),
    })
    .unknown();

const { value: envVars, error } = envVarsSchema.prefs({
    errors: {
        label: 'key'
    }
}).validate(process.env);
if (error) {
    throw new ApiError(`Config validation error: ${error.message}`);
}
module.exports = {
    env: envVars.NODE_ENV,
    port: envVars.PORT,
    mongoose: {
        url: envVars.MONGODB_URL,
        master_db: envVars.MASTER_DB,
        options: {
            useCreateIndex: true,
            useNewUrlParser: true,
            useUnifiedTopology: true,
        },
    },
    OTP_ExpirationTimeInSecond: envVars.OTP_EXPIRATION_SECONDS,
    jwt: {
        secret: envVars.JWT_SECRET,
        accessExpirationMinutes: envVars.JWT_ACCESS_EXPIRATION_MINUTES,
        refreshExpirationDays: envVars.JWT_REFRESH_EXPIRATION_DAYS,
        resetPasswordExpirationMinutes: 10,
        withReminderUserLoginExpirationHours: envVars.JWT_WITH_RE_USER_EXPIRATION_HOURS,
        withoutReminderUserLoginExpirationHours: envVars.JWT_WITHOUT_RE_USER_EXPIRATION_HOURS,
    },

    swagger_host: envVars.SWAGGER_HOST,

    ENCRYPTION: envVars.ENCRYPTION
};
