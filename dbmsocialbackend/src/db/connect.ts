import mongoose from 'mongoose';
import config from '../../config/config';

const connect = async () => {
    const dbUri = config.dbUri as string;
    try {
        await mongoose.connect(dbUri);
        console.log("connection with DB successful")
    } catch (err) {
        console.log("Unable to connect to DB")
    }
}

export {
    connect
}