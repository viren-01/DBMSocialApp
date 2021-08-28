import User from "../models/users.model"
import JWT from "../helpers/jwt"

class userService {
    public static async createUser(name: string, password: string, email: string, profileAvatar?: string) {
        try {
            let data = {
                name,
                email,
                password,
                profileAvatar
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
}
export default userService