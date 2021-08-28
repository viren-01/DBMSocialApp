import express from 'express'
import cors from 'cors'
import { connect } from './db/connect';
import { config } from 'dotenv';
import routes from './routes/index'

const server = (async () =>{
    try {
        config()
        const port = process.env.PORT
        const app = express();

        app.use(express.json())
        app.use(cors())
        app.use(routes)

        app.listen(port, () => {
            connect();
            console.log(`Server running at PORT ${port}`)
        })
    } catch (error) {
        console.log(error)
    }
})()
