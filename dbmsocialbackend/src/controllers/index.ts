import { Request, Response } from "express";
import JWT from "../helpers/jwt";
import postService from "../services/post.service";
import userService from '../services/user.service'

export class IndexController {
    public async createUser(req: Request, res: Response) {
        try {
            const { name, email, password } = req.body
            await userService.createUser(name, password, email)
            res.status(201).send({ success: true })
        } catch (error) {
            console.log(error)
            res.status(500).send()
        }
    }

    public async getAllPosts(req: Request, res: Response) {
        try {
            const { user_id } = req.body
            const resp = await postService.getAllPosts(user_id)
            res.status(200).send({ success: true, res: resp })
        } catch (error) {
            console.log(error)
            res.status(500).send()
        }
    }


    public async login(req: Request, res: Response) {
        try {
            const { email, password } = req.body
            await userService.logIn(password, email).then((resp: any) => {
                console.log(resp)
                if (resp[0].password != password) {
                    res.status(401).send({ success: false, res: "Invalid Password" })
                }
                else if (resp[0].password == password) {
                    res.status(200).send({
                        success: true, data: {
                            id: resp[0]._id, name: resp[0].name, email: email, token: resp[0].token, profilePicture: resp[0].profileAvatar
                        }
                    })
                }
                else {
                    res.status(400).send({ success: false })
                }
            })

        } catch (error) {
            console.log(error)
            res.status(500).send()
        }
    }


    public async getUserById(req: Request, res: Response) {
        try {
            const { id } = req.body
            await userService.getUserById(id).then((resp:any)=>{
                res.status(200).send(resp)
            })

        } catch (error) {
            console.log(error)
            res.status(500).send()
        }
    }

    public async updateLikes(req: Request, res: Response) {
        try {
            const { user_id, likes, comments, value } = req.body
            postService.updateLikes(user_id, {likes}).then((resp:any)=>{
                res.status(200).send(resp)
            })

        } catch (error) {
            console.log(error)
            res.status(500).send()
        }
    }

    public async createPost(req: Request, res: Response) {
        try {
            const { user_id, likes, comments, value, img} = req.body
            postService.createPost(user_id,likes, comments, value, img).then((resp:any)=>{
                res.status(200).send(resp)
            })

        } catch (error) {
            console.log(error)
            res.status(500).send()
        }
    }

}
export default new IndexController();
