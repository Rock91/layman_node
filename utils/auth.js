const httpStatus = require("http-status");
const jwt = require("jsonwebtoken");
const moment = require("moment");
const config = require("../config/config");
const mongo = require("../config/mongodb");
const ApiError = require("./ApiError");

function sign(payload, option) {
  return new Promise((resolve) => {
    let sercurData = {
      userId: payload._id,
      email: payload.email,
      type: payload.tokenType,
    };
    if (payload.rand) {
      sercurData.rand = payload.rand;
    }

    jwt.sign(sercurData, config.jwt.secret, option, (error, token) => {
      resolve({ error, token });
    });
  });
}
const generateToken = async (payload, option, type) => {
  console.log("token----------", type);
  payload.tokenType = type;
  const tokens = await sign(payload, option);
  const accessTokenExpires = moment().add(
    config.jwt.accessExpirationMinutes,
    "minutes"
  );
  await saveToken(tokens.token, payload._id, accessTokenExpires, payload);
  return tokens;
};
const generateTokenForUsers = async (payload, option, type) => {
  payload.tokenType = payload.type; //type;
  const tokens = await sign(payload, option);
  const accessTokenExpires = moment().add(100000000, "minutes");
  await saveToken(tokens.token, payload._id, accessTokenExpires, payload);
  return tokens;
};

const saveToken = async (token, userId, expires, payload) => {
  let updateData = {
    userId: userId,
    token: token,
    expires: expires,
    type: payload.tokenType,
  };
  if (payload.rand) {
    updateData.rand = payload.rand;
  }
  let tokenDoc;
  if (payload.type == "access") {
    tokenDoc = await mongo.insertOne({
      db: mongo.masterDb(),
      model: mongo.models.tokens,
      document: updateData,
    });
  } else {
    tokenDoc = await mongo.findOneAndUpdate({
      db: mongo.masterDb(),
      model: mongo.models.tokens,
      query: {
        userId: userId,
        type: payload.type,
      },
      update: updateData,
      options: {
        upsert: true,
        new: true,
      },
    });
  }
  console.log("\nsaveToken : tokenDoc : ", JSON.stringify(tokenDoc));
  return tokenDoc;
};

function verify(token) {
  return new Promise((resolve) => {
    jwt.verify(token, config.jwt.secret, (error, decoded) => {
      resolve({ error, decoded });
    });
  });
}

async function authMiddleware(req, res, next) {
  // console.log("authMiddleware : req.headers : ", req.headers);
  let authToken = req.headers["authorization"]
    ? req.headers["authorization"].replace("Bearer ", "")
    : null;
  // console.log("authMiddleware : authToken : ", authToken);

  if (!authToken) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Unauthorized1");
  }
  // console.log("authMiddleware : authToken :",authToken)
  var { decoded, error } = await verify(authToken, config.jwt.secret);
  // console.log("authMiddleware : decoded : ", decoded);
  // console.log("authMiddleware : error : ", error);

  if (
    error ||
    !decoded ||
    !decoded.exp ||
    new Date(decoded.exp * 1000).getTime() < new Date().getTime()
  ) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Unauthorized2");
  }

  let tokenDoc = await mongo.findOne({
    db: mongo.masterDb(),
    model: mongo.models.tokens,
    query: {
      userId: decoded.userId,
      type: decoded.type,
      token: authToken,
    },
  });
  if (!tokenDoc) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Unauthorized3");
  }
  if (new Date(tokenDoc.expires).getTime() < new Date().getTime()) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Unauthorized4");
  }
  req.user = {
    userId: decoded.userId,
    email: decoded.email,
  };
}
const resetPasswordVerify = async (payload) => {
  var { decoded, error } = await verify(payload.token, config.jwt.secret);

  if (
    error ||
    !decoded ||
    !decoded.exp ||
    new Date(decoded.exp * 1000).getTime() < new Date().getTime()
  ) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Unauthorized2");
  }
  let query = {
    userId: decoded.userId,
    type: decoded.type,
    token: payload.token,
  };
  console.log("\nresetPasswordVerify : query : ", JSON.stringify(query));
  let tokenDoc = await mongo.findOne({
    db: mongo.masterDb(),
    model: mongo.models.tokens,
    query: query,
  });
  console.log("resetPasswordVerify : tokenDoc : ", JSON.stringify(tokenDoc));
  if (!tokenDoc) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Link expaire!!");
  }

  console.log(
    "resetPasswordVerify : time condition : ",
    new Date(tokenDoc.expires).getTime(),
    new Date().getTime()
  );
  if (new Date(tokenDoc.expires).getTime() < new Date().getTime()) {
    await mongo.deleteOne({
      db: mongo.masterDb(),
      model: mongo.models.tokens,
      query: query,
    });
    throw new ApiError(httpStatus.BAD_REQUEST, "Link expaire!!");
  }
  let user = {
    userId: decoded.userId,
    email: decoded.email,
  };
  return user;
};

async function decodeHeader(req) {
  let authToken = req.headers["authorization"]
    ? req.headers["authorization"].replace("Bearer ", "")
    : null;
  var { decoded, error } = await verify(authToken, config.jwt.secret);
  //     throw new ApiError(httpStatus.BAD_REQUEST, "use valid authorization")
  if (decoded && decoded.is_Block) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      "You are blocked by superAdmin!"
    );
  }
  if (decoded) {
    return (req.user = {
      userId: decoded.userId,
      email: decoded.email,
    });
  }
  return (req.user = {});
}

async function passwordValidation(password) {
  console.log("updateDailyActiveUsers:: ", password);
  if (password.length >= 8) {
    if (!/[A-Z]/.test(password))
      return { flag: true, msg: "At least one upper case letter required" };
    if (!/[a-z]/.test(password))
      return { flag: true, msg: "At least one lower case letter required" };
    if (!/\d/.test(password))
      return { flag: true, msg: "At least one numeric value required" };
    if (!/[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(password))
      return {
        flag: true,
        msg: "At least one special character (eg. &@*#!) required",
      };

    return { flag: false, msg: "" };
  } else {
    return {
      flag: true,
      msg: "Password length must be greater than or equal to 8",
    };
  }
}
module.exports = {
  generateToken,
  verify,
  authMiddleware,
  resetPasswordVerify,
  generateTokenForUsers,
  decodeHeader,
  passwordValidation,
};
