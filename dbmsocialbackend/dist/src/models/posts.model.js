"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var postSchema = new mongoose_1.Schema({
    user_id: {
        type: String,
        required: true
    },
    likes: {
        type: String
    },
    comments: {
        type: String
    },
    value: {
        type: String
    }
});
var Post = (0, mongoose_1.model)("post", postSchema);
module.exports = Post;
