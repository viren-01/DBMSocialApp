import User from "../models/users.model"
import JWT from "../helpers/jwt"

class userService {
    public static async createUser(name: string, password: string, email: string) {
        try {
            let data = {
                name,
                email,
                password,
                profileAvatar:""
            }
            const token = await JWT.generateToken(data)
            const newuser = new User({
                ...data,
                token
            })
            newuser.save((err, newuser) => {
                if (err) {
                    console.log(err)
                }
                else {
                    console.log(newuser.email)
                }
            })
        } catch (error) {
            console.log(error)
        }
    }

    public static async logIn(password: string, email: string) {
        try {
            return new Promise(async (resolve, reject) => {
                let condition = { email }
                const user = await User.find(condition)
                resolve(user)
            })
        } catch (error) {
            console.log(error)
        }
    }

    public static async getUserById(id: string) {
        try {
            return new Promise(async (resolve, reject) => {
                let condition = { _id: id }
                const user = await User.findOne(condition)
                resolve(user)
            })
        } catch (error) {
            console.log(error)
        }
    }
}
export default userService