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
import DeleteIcon from "@mui/icons-material/Delete";
import UnarchiveIcon from "@mui/icons-material/Unarchive";
import ColorLensIcon from "@mui/icons-material/ColorLens";
import PushPinIcon from "@mui/icons-material/PushPin";
import PushPinOutlinedIcon from "@mui/icons-material/PushPinOutlined";
import IconButton from "@mui/material/IconButton";
import LabelIcon from "@mui/icons-material/Label";

const ArchivedNoteCard = ({ note, key }) => {
    const [pinned, setPinned] = useState(note.pinned);
    const [variant, setVariant] = useState("outlined");
    const [activeColor, setActiveColor] = useState("#ffffff"); // white

    // Pinned notes are transferred to Pinned Notes section in Home tab.
    const handlePinned = () => {
        axios
            .post("http://localhost:8000/updatePinned", {
                id: note.id,
                pinned: !pinned,
            })
            .then((res) => {
                window.location.reload();
            })
            .catch((err) => {
                alert("Error in pinning note");
            });
    };

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

    // Delete the selected Label from the note
    const handleDeleteLabel = (label) => {
        axios
            .post(`http://localhost:8000/deleteLabel/${note.id}`, {
                labelValue: label,
            })
            .then((result) => {
                window.location.reload();
            })
            .catch(() => {
                alert("Unable to delete label");
            });
    };

    // Delete the selected note
    const handleDeleteNote = () => {
        axios
            .post("http://localhost:8000/deleteNote", { id: note.id })
            .then((result) => {
                window.location.reload();
            })
            .catch(() => {
                alert("Unable to delete note");
            });
    };

    // Unarchive the selected note
    const handleUnarchiveNote = () => {
        axios
            .post("http://localhost:8000/unarchiveNote", { id: note.id })
            .then((result) => {
                window.location.reload();
            })
            .catch(() => {
                alert("Unable to unarchive note");
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
                <CardHeader
                    title={note.title}
                    action={
                        <IconButton onClick={handlePinned}>
                            {pinned ? (
                                <PushPinIcon
                                    color={activeColor}
                                    sx={{ fontSize: 20 }}
                                />
                            ) : (
                                <PushPinOutlinedIcon
                                    sx={{ fontSize: 20, color: activeColor }}
                                />
                            )}
                        </IconButton>
                    }
                />
                <CardContent>{note.body}</CardContent>
                <Box sx={{ paddingX: 1 }}>
                    {note.labels.map((label) => (
                        <Chip
                            label={label}
                            size="small"
                            onDelete={() => handleDeleteLabel(label)}
                            sx={{ padding: 0, marginRight: 1 }}
                        />
                    ))}
                </Box>
                <CardActions>
                    <Tooltip title="delete">
                        <IconButton onClick={handleDeleteNote}>
                            <DeleteIcon
                                variant="outlined"
                                sx={{ fontSize: 20, color: activeColor }}
                            />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="unarchive">
                        <IconButton onClick={handleUnarchiveNote}>
                            <UnarchiveIcon
                                sx={{ fontSize: 20, color: activeColor }}
                            />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="background color">
                        <IconButton>
                            <ColorLensIcon
                                sx={{ fontSize: 20, color: activeColor }}
                            />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="label">
                        <IconButton>
                            <LabelIcon
                                sx={{ fontSize: 20, color: activeColor }}
                            />
                        </IconButton>
                    </Tooltip>
                </CardActions>
            </Card>
        </Slide>
    );
};

export default ArchivedNoteCard;
