//import cloudinary and define your credentials
const cloudinary = require('cloudinary');
module.exports = {
    upload: (req, res) => {
        //Define your timestamp
        const timestamp = Math.floor(new Date().getTime() / 1000);
        //Then your api secret 
        const api_secret = process.env.CLOUDINARY_API_SECRET;
        //Then sign your credentials
        const signature = cloudinary.utils.api_sign_request({timestamp}, api_secret);
        //Now create your payload 
        const payload = {
            timestamp,
            signature
        }
        //Now send your payload to your frontend
        res.status(200).json({payload});
    }
}