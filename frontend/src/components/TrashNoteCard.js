// React Components
import { useState } from "react";

// NPM Components
import axios from "axios";

// MUI Components
import {
    Card,
    CardActions,
    CardContent,
    CardHeader,
    Box,
    Chip,
    Tooltip,
    Slide,
} from "@mui/material";

// MUI Icons Components
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import RestoreFromTrashIcon from "@mui/icons-material/RestoreFromTrash";
import IconButton from "@mui/material/IconButton";

const TrashNoteCard = ({ note, key }) => {
    const [variant, setVariant] = useState("outlined");
    const [activeColor, setActiveColor] = useState("#ffffff"); // white

    // highlights the note card when mouse is over it
    const onMouseOver = () => {
        setActiveColor("iconColorActive");
        setVariant("elevation");
    };

    // removes the highlight when mouse is out of it
    const onMouseOut = () => {
        setActiveColor("#ffffff"); // white
        setVariant("outlined");
    };

    // Permanantly delete the selected note
    const handleDeleteNote = () => {
        axios
            .post("http://localhost:8000/deleteNoteForever", { id: note.id })
            .then((result) => {
                window.location.reload();
            })
            .catch(() => {
                alert("Unable to delete note");
            });
    };

    // Restore the selected note
    const handleRestoreNote = () => {
        axios
            .post("http://localhost:8000/restoreNote", { id: note.id })
            .then((result) => {
                window.location.reload();
            })
            .catch(() => {
                alert("Unable to restore note");
            });
    };

    return (
        <Slide direction="up" in timeout={200}>
            <Card
                variant={variant}
                p={1}
                sx={{ borderRadius: 3 }}
                onMouseOver={onMouseOver}
                onMouseOut={onMouseOut}
                raised
            >
                <CardHeader title={note.title} />
                <CardContent>{note.body}</CardContent>
                <Box sx={{ paddingX: 1 }}>
                    {note.labels.map((label) => (
                        <Chip
                            label={label}
                            size="small"
                            sx={{ padding: 0, marginRight: 1 }}
                        />
                    ))}
                </Box>
                <CardActions>
                    <Tooltip title="delete forever">
                        <IconButton onClick={handleDeleteNote}>
                            <DeleteForeverIcon
                                sx={{ fontSize: 20, color: activeColor }}
                            />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="restore">
                        <IconButton onClick={handleRestoreNote}>
                            <RestoreFromTrashIcon
                                sx={{ fontSize: 20, color: activeColor }}
                            />
                        </IconButton>
                    </Tooltip>
                </CardActions>
            </Card>
        </Slide>
    );
};

export default TrashNoteCard;
