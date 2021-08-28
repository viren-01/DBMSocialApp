import { Request, Response } from "express";
import JWT from "../helpers/jwt";
import postService from "../services/post.service";
import userService from '../services/user.service'

export class IndexController {
    public async createUser(req: Request, res: Response) {
        try {
            const { name, email, password, profileAvatar } = req.body
            await userService.createUser(name, password, email, profileAvatar)
            res.status(201).send({success: true})
        } catch (error) {
            console.log(error)
            res.status(500).send()
        }
    }

    public async getAllPosts(req: Request, res: Response) {
        try {
            const { user_id} = req.body
            const resp = await postService.getAllPosts(user_id)
            res.status(201).send({success: true, res: resp})
        } catch (error) {
            console.log(error)
            res.status(500).send()
        }
    }

}
export default new IndexController();
