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
        minlength: [5, "Size of Password field is less than 5, Please enter 5 length Password"]
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