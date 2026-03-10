const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
    destination: function(req, file , cb){
        cb(null , "uploads/");
    },

    filename: function (req, file , cb) {
        cb(
            null,
            file.filename +"-" + Date.now() + path.extname(file.originalname)
        );
    }
});

function checkFileType(file , cb){
    const filetype = /jpg|jpeg|png/;

    const extname = filetype.test(
        path.extname(file.originalname).toLowerCase()
    );

    const mimetype = filetype.test(file.mimetype);

    if(extname && mimetype) {
        return cb(null , true);
    }else{
        cb("Images only!");
    }
}

const upload = multer({
    storage: storage,
    fileFilter: function (req, file , cb) {
        checkFileType(file, cb);
    }
});

module.exports = upload;