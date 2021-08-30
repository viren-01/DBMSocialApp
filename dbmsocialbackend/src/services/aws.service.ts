import AWS from 'aws-sdk'
import fs from 'fs'
const KEY_ID= ""
const SECRET_KEY = ""
const BucketName = 'dbmsocial'

const s3 = new AWS.S3({
    accessKeyId: KEY_ID,
    secretAccessKey:SECRET_KEY
})

const upload = async(file: any)=>{
    const fileContent = fs.readFileSync(file.data)
    const params = {
        Bucket:BucketName,
        Key:file.name,
        Body: fileContent
    }
    s3.upload(params, (err: any, res:any)=>{
        if(err) console.log(err)
    })
}
