const cloudinary = require('cloudinary').v2;
const streamifier = require('streamifier');

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true
});

const streamUpload = (file) => {
    return new Promise((resolve, reject) => {
        let stream = cloudinary.uploader.upload_stream((error, result) => {
            if (result) {
                resolve(result);
            } else {
                reject(error);
            }
        });
        streamifier.createReadStream(file.buffer).pipe(stream);
    });
};

const uploadSingleFile = async (file) => {
    return await streamUpload(file);
}

const uploadMultipleFiles = async (files) => {
    let urls = [];
    if (files.length) {
        for (let file of files) {
            const urlObject = await uploadSingleFile(file);
            if (urlObject) urls.push(urlObject.url);
        }
    }
    return urls;
}

module.exports = {
    uploadMultipleFiles,
    uploadSingleFile
}