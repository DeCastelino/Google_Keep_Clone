import { useState } from "react";
import {
    Card,
    CardActions,
    CardContent,
    CardHeader,
    Box,
    Chip,
    Tooltip,
} from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import RestoreFromTrashIcon from "@mui/icons-material/RestoreFromTrash";
import ColorLensIcon from "@mui/icons-material/ColorLens";
import PushPinIcon from "@mui/icons-material/PushPin";
import PushPinOutlinedIcon from "@mui/icons-material/PushPinOutlined";
import IconButton from "@mui/material/IconButton";
import LabelIcon from "@mui/icons-material/Label";
import axios from "axios";

const TrashNoteCard = ({ note, key }) => {
    const [variant, setVariant] = useState("outlined");
    const [activeColor, setActiveColor] = useState("#ffffff"); // white

    const onMouseOver = () => {
        setActiveColor("iconColorActive");
        setVariant("elevation");
    };
    const onMouseOut = () => {
        setActiveColor("#ffffff"); // white
        setVariant("outlined");
    };

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
    );
};

export default TrashNoteCard;
