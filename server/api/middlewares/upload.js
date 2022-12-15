const { v4: uuidv4 } = require("uuid");
const multer = require("multer");
const { diskStorage } = require("multer");


const storage = multer.diskStorage({
    filename: (req, file, cb) => {
        const filename = file.originalname.toLowerCase().split(" ").join("-");
        const savedFilename = uuidv4() + "-" + filename;
        cb(null, savedFilename);
    },
});
// multer.diskStorage({});
exports.uploadImage = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (
            file.mimetype === "image/png" ||
            file.mimetype === "image/jpg" ||
            file.mimetype === "image/jpeg"
        ) {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error("Only .png, .jpg , .jpeg format allowed "));
        }
    },
});

exports.uploadVideo = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (
            file.mimetype === "video/mp4" ||
            file.mimetype === "video/webm" ||
            file.mimetype === "video/mkv"
        ) {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error("Only .mp4, .webm , .mkv format allowed "));
        }
    },
});

