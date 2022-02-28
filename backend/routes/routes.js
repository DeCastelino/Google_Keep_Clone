const express = require("express");
const userController = require("../controllers/userController");
const postController = require("../controllers/postController");
const { upload } = require("../middleware/multer");
const router = express.Router();

// GET ROUTES
router.get("/", postController.get_all_posts);

// POST ROUTES
router.post("/createNote", postController.upload_post);
router.post("/register", userController.user_register);
router.post("/login", userController.user_login);
router.post("/upload", upload.single("file"), userController.upload_image);
router.post("/updateName", userController.update_name);
router.post("/updateEmail", userController.update_email);
router.post("/updatePassword", userController.update_password);

// DELETE ROUTES
router.post("/:id", postController.delete_note_label);
module.exports = router;
