import jwt from 'jsonwebtoken';
require('dotenv').config();

class JWT{

public static generateToken = async (data: any) => {
    const ACCESS_TOKEN: any = process.env.ACCESS_TOKEN;
    const token = jwt.sign({
        data: data
    }, ACCESS_TOKEN)
    return token;
}

public static verifyToken = (token: string) => {
    try {
        const ACCESS_TOKEN: any = process.env.ACCESS_TOKEN;
        const data = jwt.verify(token, ACCESS_TOKEN);
        return data;
    } catch (error) {
        console.log(error);
        return false;
    }
}
}

export default JWT