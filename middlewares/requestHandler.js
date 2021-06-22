const httpStatus  = require('http-status');

const pick        = require('../utils/pick');
const joiValidate = require('../utils/joiValidate');
const ApiError    = require('../utils/ApiError');
const auth        = require('../utils/auth');

const handleAPICall = (controller) => async (req, res, next) => {
	try {
		if(controller.auth) {
			await auth.authMiddleware(req, res, next);
		}		
		if(controller.payload) {
			const validSchema = pick(controller.payload, ['params', 'query', 'body']);
			const object      = pick(req, Object.keys(validSchema));

			const { value, error, errorMessage } = joiValidate(validSchema, object);
			let stack = "";
			if (error && error.details[0].type === "string.email"){
				stack = "email"
			}
			console.log("handleAPICall : errorMessage : ", errorMessage)
			if (error) return next(new ApiError(httpStatus.BAD_REQUEST, errorMessage, stack));
			// Object.assign(req, value);
		}
		


		if(controller.handler) {
			if((!controller.auth) && req.headers['authorization'])
			{ 
			  	let authToken = await auth.decodeHeader(req)
			  	if(authToken)
					req.user.userId = req.user.userId
			}
			req.user = req.user || {};
			let response = await controller.handler(req, res);
			var sendData  = {
				"statusCode": 200,
			    "message": "login Done",
			    "data":response
			}
			if(response.msg){
				sendData.message = response.msg;
				delete sendData.data.msg;
				// delete response;
			}
			res.send(sendData);
		} else {
			next();
		}
	} catch(err) {
		next(err instanceof ApiError ? err : new ApiError(httpStatus.BAD_REQUEST, err.toString()));
	}
}


module.exports = handleAPICall;