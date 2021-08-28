import Post from "../models/posts.model"
import JWT from "../helpers/jwt"
import { Condition } from "mongodb"

class postService {

    public static async getAllPosts(user_id: String) {
        try {
            let condition : Condition<String>= ({user_id})
            const listofPosts = Post.find(condition)
            return listofPosts
        } catch (error) {
            console.log(error)
            return error
        }
    }

    public static async createPost(user_id: any, likes: number, comments: string, value: string) {
        try {
            const newPost = new Post({
                user_id,
                likes,
                comments,
                value
            })
        } catch (error) {
            console.log(error)
        }
    }
}
export default postService