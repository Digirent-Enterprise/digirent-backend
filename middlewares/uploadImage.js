const multer = require ('multer');

const storage = multer.diskStorage({
    destination: function(req, files, cb){
        cb(null, './upload')
    },
    filename: function(req, files, cb){
        cb(null, files.originalname);
    },
});

const upload =(req,res,next) => {
    return multer({
        storage: storage,
    }).array('images');
}

module.exports = upload;
