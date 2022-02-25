import express from "express";
import {
    user_register,
    user_login,
    upload_image,
    update_name,
    update_email,
    update_password,
} from "../controllers/userController.js";
import { get_all_posts, upload_post } from "../controllers/postController.js";
import { upload } from "../middleware/multer.js";
const router = express.Router();

// GET ROUTES
router.get("/", get_all_posts);

// POST ROUTES
router.post("/uploadPost", upload_post);
router.post("/register", user_register);
router.post("/login", user_login);
router.post("/upload", upload.single("file"), upload_image);
router.post("/updateName", update_name);
router.post("/updateEmail", update_email);
router.post("/updatePassword", update_password);
export { router };
