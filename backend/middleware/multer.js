// import multer, { diskStorage } from "multer";
const multer = require("multer");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./public/uploads/");
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname); // Making filename unique by prefixing timestamp to filename
    },
});

// Check File Type
// export function checkFileType(file) {
//     // Allowed extensions
//     const allowedExtensions = /jpeg|jpg|png|gif/;
//     // Check extension
//     const extname = allowedExtensions.test(
//         path.extname(file.originalname).toLowerCase()
//     );
//     // Check mime
//     const mimetype = allowedExtensions.test(file.mimetype);

//     if (extname && mimetype) return true;
//     return false;
// }
module.exports = {
    upload: multer({ storage: storage }),
};
