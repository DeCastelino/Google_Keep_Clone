import { db } from "../firestoreDatabase/db.js";

const get_all_posts = async (req, res) => {
    // Get all Post for Home
};

const get_archived_posts = (req, res) => {
    // Get all Post for Archive
};

const get_trash_posts = (req, res) => {
    // Get all Post for Trash
};

export { get_all_posts, get_archived_posts, get_trash_posts };
