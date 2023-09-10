const express = require('express');
const router = express.Router();
import {v2 as cloudinary} from 'cloudinary';
          
cloudinary.config({ 
  cloud_name: process.env.CLOUD_NAME, 
  api_key: process.env.API_KEY, 
  api_secret: process.env.API_SECRET 
});

router.post('/', async (req, res, next) => {
    const data = req.files.file
    const response = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream({}, (err, result ) => {
          if (err) {
            reject(err)
          }
          resolve(result)
        })
        .end(data.data)
    })
    res.send(response);
  }
);

export default router;