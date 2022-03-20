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
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import RestoreFromTrashIcon from "@mui/icons-material/RestoreFromTrash";
import IconButton from "@mui/material/IconButton";

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

const TrashNoteCard = ({ note, key }) => {
    const [activeColor, setActiveColor] = useState(note.bgColor);

    // highlights the note card when mouse is over it
    const onMouseOver = () => {
        setActiveColor("iconColorActive");
    };

    // removes the highlight when mouse is out of it
    const onMouseOut = () => {
        setActiveColor(note.bgColor);
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
        <PostItCard
            p={1}
            sx={{
                transform: `rotate(${note.rotate}deg)`,
                backgroundColor: note.bgColor,
            }}
            onMouseOver={onMouseOver}
            onMouseOut={onMouseOut}
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
        </PostItCard>
    );
};

export default TrashNoteCard;
