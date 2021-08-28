"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var userSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
        minlength: 4
    },
    password: {
        type: String,
        required: true,
        minlength: [5, "Size of Password field is less than 5, Please enter 5 length Password"]
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    profileAvatar: {
        type: String
    }
});
var User = (0, mongoose_1.model)("user", userSchema);
module.exports = User;
