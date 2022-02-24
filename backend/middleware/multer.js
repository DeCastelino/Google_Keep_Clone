import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./public/uploads/");
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname); // Making filename unique by prefixing timestamp to filename
    },
});

// Check File Type
function checkFileType(file) {
    // Allowed extensions
    const allowedExtensions = /jpeg|jpg|png|gif/;
    // Check extension
    const extname = allowedExtensions.test(
        path.extname(file.originalname).toLowerCase()
    );
    // Check mime
    const mimetype = allowedExtensions.test(file.mimetype);

    if (extname && mimetype) return true;
    return false;
}
const upload = multer({ storage: storage });
export { upload, checkFileType };
