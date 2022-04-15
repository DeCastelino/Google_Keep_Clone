const admin = require("firebase-admin");
const { Storage } = require("@google-cloud/storage");
const serviceAccount = require("../serviceAccountKey.json");
require("dotenv").config({ path: "./config.env" });

// Initializing firebase object
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

const bucketName = process.env.BUCKET_NAME;
const storage = new Storage();
const bucket = storage.bucket(bucketName);

const db = admin.firestore();

db.settings({ timestampsInSnapshots: true });

// Uploading file to google cloud storage
async function uploadFile(absoluteFilePath, destFileName) {
    await bucket.upload(absoluteFilePath, {
        destination: destFileName,
    });
}

module.exports = {
    db,
    bucket,
    uploadFile,
    FieldValue: admin.firestore.FieldValue,
};
