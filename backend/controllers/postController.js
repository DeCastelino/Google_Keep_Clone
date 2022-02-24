import { db } from "../firestore/db.js";

const get_all_posts = async (req, res) => {
    await db
        .collection("posts")
        .orderBy("updatedAt", "desc")
        .get()
        .then((snapshot) => {
            let posts = [];
            snapshot.forEach((doc) => {
                posts.push({
                    id: doc.id,
                    title: doc.data().title,
                    body: doc.data().body,
                    bgColor: doc.data().bgColor,
                    labels: doc.data().labels,
                    pinned: doc.data().pinned,
                    updatedAt: doc.data().updatedAt,
                });
            });
            res.status(200).json(posts);
        })
        .catch((err) => {
            res.sendStatus(404);
        });
};

const get_archived_posts = (req, res) => {
    // Get all Post for Archive
};

const get_trash_posts = (req, res) => {
    // Get all Post for Trash
};

// Post
const upload_post = async (req, res) => {
    await db
        .collection("posts")
        .add({
            title: req.body.title,
            body: req.body.body,
            bgColor: req.body.bgColor,
            labels: req.body.labels,
            pinned: req.body.pinned,
            createdAt: new Date(),
            updatedAt: new Date(),
        })
        .then(() => {
            res.send(200);
        })
        .catch(() => {
            res.send(500);
        });
};

export { get_all_posts, get_archived_posts, get_trash_posts, upload_post };
