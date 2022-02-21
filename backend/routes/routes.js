import express from "express";
import { get_all_posts } from "../controllers/postController.js";
const router = express.Router();

// GET ROUTES
router.get("/", get_all_posts);

// POST ROUTES

export { router };
