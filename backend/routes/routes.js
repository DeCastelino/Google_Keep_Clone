import express from "express";
import { get_all_posts, upload_post } from "../controllers/postController.js";
const router = express.Router();

// GET ROUTES
router.get("/", get_all_posts);

// POST ROUTES
router.post("/uploadPost", upload_post);
export { router };
