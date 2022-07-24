const path = require('path');
const multer = require ('multer');

const storage = multer.diskStorage({
    destination: function(req, files, cb){
        cb(null, './uploadedImage')
    },
    filename: function(req, files, cb){
        cb(null, files.originalname);
    }
});

const upload = multer({
    storage: storage,
}).array("image[]");

module.exports = upload;