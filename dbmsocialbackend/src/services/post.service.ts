import Post from "../models/posts.model"
import JWT from "../helpers/jwt"
import { Condition } from "mongodb"
import userService from "./user.service"

class postService {

    public static async getAllPosts(user_id: String) {
        try {
            console.log(user_id)
            let condition: Condition<String> = ({ users: user_id })
            const listofPosts = await Post.find(condition)
            return listofPosts
        } catch (error) {
            console.log(error)
            return error
        }
    }

    public static async createPost(user_id: any, likes: number, comments: string, value: string) {
        try {
            console.log(user_id, likes, comments, value )
            const newPost = new Post({
                user_id,
                likes,
                comments,
                value,
                users: [user_id]
            })
            await newPost.save()
        } catch (error) {
            console.log(error)
        }
    }

    public static async updateLikes(user_id: string, bodyToUpdate: any) {
        try {
            const { likes} = bodyToUpdate
            const condition = {user_id: user_id }
            console.log(user_id)
            console.log("fgdfgdfgf")
            await Post.updateOne(condition, {
                $set:{
                    likes
                }
            })
        } catch (error) {
            console.log(error)
        }
    }
}
export default postService