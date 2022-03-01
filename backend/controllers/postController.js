const { db, FieldValue } = require("../firestore/db");

const get_home_notes = async (req, res) => {
    db.collection("posts")
        .where("email", "==", req.params.email)
        .where("type", "==", "home")
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
                    type: doc.data().type,
                });
            });
            res.status(200).json(posts);
        })
        .catch((err) => {
            res.sendStatus(404);
        });
};

const get_archived_notes = (req, res) => {
    db.collection("posts")
        .where("email", "==", req.params.email)
        .where("type", "==", "archived")
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
                    type: doc.data().type,
                });
            });
            res.status(200).json(posts);
        })
        .catch((err) => {
            res.sendStatus(404);
        });
};

const get_trash_notes = (req, res) => {
    db.collection("posts")
        .where("email", "==", req.params.email)
        .where("type", "==", "trash")
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
                    type: doc.data().type,
                });
            });
            res.status(200).json(posts);
        })
        .catch((err) => {
            res.sendStatus(404);
        });
};

// Post
const upload_note = async (req, res) => {
    await db
        .collection("posts")
        .add({
            email: req.body.email,
            title: req.body.title,
            body: req.body.body,
            bgColor: req.body.bgColor,
            labels: req.body.labels,
            pinned: req.body.pinned,
            type: req.body.type,
            createdAt: new Date(),
            updatedAt: new Date(),
        })
        .then(() => {
            res.sendStatus(200);
        })
        .catch(() => {
            res.sendstatus(500);
        });
};

// Deleting Note Label
const delete_note_label = (req, res) => {
    db.collection("posts")
        .doc(req.params.id)
        .update({
            labels: FieldValue.arrayRemove(req.body.labelValue),
        })
        .then(() => {
            res.sendStatus(200);
        })
        .catch((err) => {
            res.sendStatus(404);
        });
};

// Transferring Note to Trash
const delete_note = (req, res) => {
    db.collection("posts")
        .doc(req.body.id)
        .update({
            type: "trash",
            pinned: false,
        })
        .then(() => {
            res.sendStatus(200);
        })
        .catch((err) => {
            res.sendStatus(404);
        });
};

// Permanently Deleting Note
const delete_note_forever = (req, res) => {
    db.collection("posts")
        .doc(req.body.id)
        .delete()
        .then(() => {
            res.sendStatus(200);
        })
        .catch((err) => {
            res.sendStatus(404);
        });
};

// Restoring Deleted Note
const restore_note = (req, res) => {
    db.collection("posts")
        .doc(req.body.id)
        .update({
            type: "home",
        })
        .then(() => {
            res.sendStatus(200);
        })
        .catch((err) => {
            res.sendStatus(404);
        });
};

const get_all_labels = (req, res) => {
    db.collection("labels")
        .where("email", "==", req.body.email)
        .get()
        .then((snapshot) => {
            let labels = [];
            snapshot.forEach((doc) => {
                labels.push({
                    id: doc.id,
                    labels: doc.data().labels,
                });
            });
            res.status(200).json(labels);
        })
        .catch((err) => {
            res.sendStatus(404);
        });
};

const archive_note = (req, res) => {
    db.collection("posts")
        .doc(req.body.id)
        .update({
            type: "archived",
            pinned: false,
        })
        .then(() => {
            res.sendStatus(200);
        })
        .catch((err) => {
            res.sendStatus(404);
        });
};

const unarchive_note = (req, res) => {
    db.collection("posts")
        .doc(req.body.id)
        .update({
            type: "home",
        })
        .then(() => {
            res.sendStatus(200);
        })
        .catch((err) => {
            res.sendStatus(404);
        });
};

const update_pinned = (req, res) => {
    db.collection("posts")
        .doc(req.body.id)
        .update({
            pinned: req.body.pinned,
            type: "home",
        })
        .then(() => {
            res.sendStatus(200);
        })
        .catch((err) => {
            res.sendStatus(404);
        });
};

module.exports = {
    get_home_notes,
    get_all_labels,
    get_archived_notes,
    get_trash_notes,
    upload_note,
    delete_note_label,
    delete_note,
    archive_note,
    delete_note_forever,
    restore_note,
    unarchive_note,
    update_pinned,
};
