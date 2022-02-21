import dotenv from "dotenv";
import { initializeApp, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import serviceAccount from "../serviceAccountKey.json" assert { type: "json" };

dotenv.config({ path: "../config.env" });

// Initializing firebase object
initializeApp({
    credential: cert(serviceAccount),
});

const db = getFirestore();

export { db };
