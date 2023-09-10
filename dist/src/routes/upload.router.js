"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const router = express.Router();
const cloudinary_1 = require("cloudinary");
cloudinary_1.v2.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});
router.post('/', async (req, res, next) => {
    const data = req.files.file;
    const response = await new Promise((resolve, reject) => {
        cloudinary_1.v2.uploader
            .upload_stream({}, (err, result) => {
            if (err) {
                reject(err);
            }
            resolve(result);
        })
            .end(data.data);
    });
    res.send(response);
});
exports.default = router;
