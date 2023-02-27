const cloudinary = require('cloudinary').v2
// const { log } = require('console')
const fs = require('fs')

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

const uploadCloudinary = (req, res , next) => {
    const pathfile = req.file.path
    const uniqueName = new Date().toISOString

    cloudinary.uploader.upload(
        pathfile, {

            resource_type: 'raw',
            public_id: `cloudinary-express/${uniqueName}`,
            tags: 'cloudinary-express'
        },
        (err, Image) => {
            if(err) return res.status(500).send(err)
            console.log('file upload to cloudinary');

            fs.unlinkSync(pathfile)
            req.Image = Image
            next();
        }
    )
}
module.exports = uploadCloudinary