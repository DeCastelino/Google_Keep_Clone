// React Components
import { useState } from "react";

// NPM Components
import axios from "axios";

// MUI Components
import {
    styled,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    Box,
    Chip,
    Tooltip,
} from "@mui/material";

// MUI Icons Components
import DeleteIcon from "@mui/icons-material/Delete";
import UnarchiveIcon from "@mui/icons-material/Unarchive";
import ColorLensIcon from "@mui/icons-material/ColorLens";
import PushPinIcon from "@mui/icons-material/PushPin";
import PushPinOutlinedIcon from "@mui/icons-material/PushPinOutlined";
import IconButton from "@mui/material/IconButton";
import LabelIcon from "@mui/icons-material/Label";

const PostItCard = styled(Card)`
    display: block;
    font-family: "Handlee", cursive;
    font-size: 1.5rem;
    box-shadow: 5px 5px 7px rgba(33, 33, 33, 0.1);
    transition: transform 0.15s linear;
    &:hover,
    &:focus {
        box-shadow: 10px 10px 7px rgba(0, 0, 0, 0.3);
        transform: scale(1.1);
        position: relative;
        z-index: 5;
    }
`;

const ArchivedNoteCard = ({ note, key }) => {
    const [pinned, setPinned] = useState(note.pinned);
    const [activeColor, setActiveColor] = useState(note.bgColor);

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
    };

    // removes the highlight when mouse is out of it
    const onMouseOut = () => {
        setActiveColor(note.bgColor);
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
        <PostItCard
            p={1}
            sx={{
                transform: `rotate(${note.rotate}deg)`,
                backgroundColor: note.bgColor,
            }}
            onMouseOver={onMouseOver}
            onMouseOut={onMouseOut}
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
                        <LabelIcon sx={{ fontSize: 20, color: activeColor }} />
                    </IconButton>
                </Tooltip>
            </CardActions>
        </PostItCard>
    );
};

export default ArchivedNoteCard;
