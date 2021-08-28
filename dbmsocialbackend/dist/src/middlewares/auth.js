"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var response_handler_1 = require("../helpers/response_handler");
var jwt_1 = __importDefault(require("../helpers/jwt"));
var authenticateToken = function (req, res, next) {
    var authHeader = req.headers['authorization'];
    var responseObj = {};
    responseObj.err = true;
    responseObj.responseCode = 401;
    if (!authHeader) {
        responseObj.msg = "Authorization header is missing";
        return (0, response_handler_1.sendResponse)(responseObj);
    }
    var token = authHeader === null || authHeader === void 0 ? void 0 : authHeader.split(" ")[1];
    if (token == null) {
        responseObj.msg = "Authorization token is missing";
        return (0, response_handler_1.sendResponse)(responseObj);
    }
    else {
        try {
            var data = jwt_1.default.verifyToken(token);
            if (!data) {
                responseObj.msg = "Authorization token is invalid";
                return (0, response_handler_1.sendResponse)(responseObj);
            }
            else {
                req.user = data;
                req.headers["name"] = data.data.name;
                req.headers["email"] = data.data.email;
                next();
            }
        }
        catch (err) {
            responseObj.msg =
                err.error.message || "Authorization token verfication failed";
            return (0, response_handler_1.sendResponse)(responseObj);
        }
    }
};
exports.default = {
    authenticateToken: authenticateToken
};
