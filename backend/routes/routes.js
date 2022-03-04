const express = require("express");
const userController = require("../controllers/userController");
const postController = require("../controllers/postController");
const { upload } = require("../middleware/multer");
const router = express.Router();

// GET ROUTES
router.get("/getLabels", postController.get_all_labels);
router.get("/getHomeNotes/:email", postController.get_home_notes);
router.get("/getArchivedNotes/:email", postController.get_archived_notes);
router.get("/getDeletedNotes/:email", postController.get_trash_notes);

// POST ROUTES
router.post("/createNote", postController.upload_note);
router.post("/register", userController.user_register);
router.post("/login", userController.user_login);
router.post("/upload", upload.single("file"), userController.upload_image);
router.post("/updateName", userController.update_name);
router.post("/updateEmail", userController.update_email);
router.post("/updatePassword", userController.update_password);
router.post("/archiveNote", postController.archive_note);
router.post("/unarchiveNote", postController.unarchive_note);
router.post("/updatePinned", postController.update_pinned);
router.post("/deleteNoteForever", postController.delete_note_forever);
router.post("/restoreNote", postController.restore_note);
router.post("/updateNote", postController.update_note);

// DELETE ROUTES
router.post("/deleteLabel/:id", postController.delete_note_label);
router.post("/deleteNote", postController.delete_note);
module.exports = router;
