const multer = require ('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function(req, files, cb){
        cb(null, path.join(__dirname, '../upload/'));
    },
    filename: function(req, files, cb){
        cb(null, files.originalname);
    }
});

const upload =  multer({
        storage: storage
    }).array('images', 10);

module.exports = upload;
