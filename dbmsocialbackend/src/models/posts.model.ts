import { Schema, model } from "mongoose";

interface Post {
    user_id: string,
    likes: string,
    comments: string,
    value: string
}

const postSchema = new Schema({
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
    },
    users:{
        type:Array
    },
    img:{
        type: String
    },
    createdBy:{
        type: String
    },
    avatar:{
        type: String
    },
    createdOn:{
        type: String
    }
})

const Post = model<Post>("post", postSchema, "Posts");

export default Post