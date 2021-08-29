import { Schema, model } from "mongoose";

interface IUser {
    name: string,
    password: string,
    email: string,
    profileAvatar?: string
}

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        minlength: 4
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    profileAvatar: {
        type: String
    },
    token:{
        type: String
    }
})

const User = model<IUser>("user", userSchema, "Users");

export default User