import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import { initializeApp, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { Storage } from "@google-cloud/storage";
import serviceAccount from "../serviceAccountKey.json" assert { type: "json" };
import serviceAccountCloudKey from "../keep-notes-342206-8bcc0c612e2c.json" assert { type: "json" };

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, "../config.env") });

// Initializing firebase object
initializeApp({
    credential: cert(serviceAccount),
});

const bucketName = process.env.BUCKET_NAME;
const storage = new Storage({ keyFilename: serviceAccountCloudKey });
const bucket = storage.bucket(bucketName);

const db = getFirestore();

// Uploading file to google cloud storage
async function uploadFile(absoluteFilePath, destFileName) {
    await bucket.upload(absoluteFilePath, {
        destination: destFileName,
    });
}

export { db, uploadFile };
