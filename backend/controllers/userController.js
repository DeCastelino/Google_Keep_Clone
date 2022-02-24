import bcrypt from "bcrypt";
import { db } from "../firestore/db.js";
import { fileURLToPath } from "url";

const user_register = async (req, res) => {
    const user = await db
        .collection("users")
        .where("email", "==", req.body.email)
        .get();
    if (!user.empty) res.sendStatus(404);
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(req.body.password, salt);
    db.collection("users").add({
        firstname: req.body.firstname,
        surname: req.body.surname,
        email: req.body.email,
        password: hashedPass,
        profilePicture:
            "https://storage.googleapis.com/keep_note_bucket/profile_image.png",
    });
    res.sendStatus(200);
};

const user_login = (req, res) => {
    db.collection("users")
        .where("email", "==", req.body.email)
        .get()
        .then((snapshot) => {
            snapshot.forEach((doc) => {
                bcrypt
                    .compare(req.body.password, doc.data().password)
                    .then((result) => {
                        if (result) {
                            res.status(200).json({
                                firstname: doc.data().firstname,
                                surname: doc.data().surname,
                                email: doc.data().email,
                                profilePicture: doc.data().profilePicture,
                            });
                        } else {
                            res.sendStatus(404);
                        }
                    });
            });
        });
};

const upload_image = (req, res) => {
    // If file is invalid
    if (req.file === undefined) res.sendStatus(404);
    // Create a checking system to check file extensions using the already existing function.
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const absoluteFilePath =
        path.resolve(__dirname, "..") + "/" + req.file.path;
    const destFileName = req.file.filename;

    // Uploading file to google cloud storage
    uploadFile(absoluteFilePath, destFileName).catch(console.error);

    // Fetching public link to the file from google cloud storage
    var fileRef = bucket.file(destFileName);
    publicUrl = fileRef.publicUrl();
    res.status(200).json(publicUrl);
};

export { user_register, user_login, upload_image };
