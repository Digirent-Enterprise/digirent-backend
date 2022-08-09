const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, files, cb) {
    cb(null, path.join(__dirname, "../upload/"));
  },
  filename: function (req, files, cb) {
    cb(null, files.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    //reject file
    cb({ message: "Unsupported file format" }, false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
}).array("images", 10);

module.exports = upload;
