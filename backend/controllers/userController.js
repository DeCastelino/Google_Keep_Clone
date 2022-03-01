const bcrypt = require("bcrypt");
const { db, bucket, uploadFile } = require("../firestore/db");
const path = require("path");

const user_register = async (req, res) => {
    const user = await db
        .collection("users")
        .where("email", "==", req.body.email)
        .get();
    if (!user.empty) res.sendStatus(404);
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(req.body.password, salt);
    db.collection("users")
        .add({
            firstname: req.body.firstname,
            surname: req.body.surname,
            email: req.body.email,
            password: hashedPass,
            profilePicture:
                "https://storage.googleapis.com/keep_note_bucket/profile_image.png",
        })
        .then(() => {
            // Create a label collection of the new user
            db.collection("labels").add({
                userEmail: req.body.email,
            });
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
    const absoluteFilePath =
        path.resolve(__dirname, "..") + "/" + req.file.path;
    const destFileName = req.file.filename;

    // Uploading file to google cloud storage
    uploadFile(absoluteFilePath, destFileName).catch(console.error);

    // Fetching public link to the file from google cloud storage
    const fileRef = bucket.file(destFileName);
    const publicUrl = fileRef.publicUrl();
    res.status(200).json(publicUrl);
};

const update_name = (req, res) => {
    db.collection("users")
        .where("email", "==", req.body.email)
        .get()
        .then((snapshot) => {
            snapshot.forEach((doc) => {
                db.collection("users").doc(doc.id).update({
                    firstname: req.body.firstname,
                    surname: req.body.surname,
                });
            });
            res.sendStatus(200);
        })
        .catch((err) => {
            res.sendStatus(404);
        });
};
const update_email = async (req, res) => {
    const emailexists = await db
        .collection("users")
        .where("email", "==", req.body.newEmail)
        .get();
    if (!emailexists.empty) res.sendStatus(404);
    db.collection("users")
        .where("email", "==", req.body.email)
        .get()
        .then((snapshot) => {
            snapshot.forEach((doc) => {
                db.collection("users").doc(doc.id).update({
                    email: req.body.newEmail,
                });
            });
            res.sendStatus(200);
        })
        .catch((err) => {
            res.sendStatus(404);
        });
};

const update_password = (req, res) => {
    db.collection("users")
        .where("email", "==", req.body.email)
        .get()
        .then((snapshot) => {
            snapshot.forEach(async (doc) => {
                const validated = await bcrypt.compare(
                    req.body.password,
                    doc.data().password
                );
                if (validated) {
                    const salt = await bcrypt.genSalt(10);
                    const hashedPass = await bcrypt.hash(
                        req.body.newPassword,
                        salt
                    );
                    db.collection("users").doc(doc.id).update({
                        password: hashedPass,
                    });
                    res.sendStatus(200);
                } else res.sendStatus(404);
            });
        })
        .catch((err) => {
            res.sendStatus(404);
        });
};
module.exports = {
    user_register,
    user_login,
    upload_image,
    update_name,
    update_email,
    update_password,
};
