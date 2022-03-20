// React Components
import { useContext, useState, useEffect } from "react";

// NPM Components
import axios from "axios";

// Custom Components
import { Context } from "./Context/userContext";

// MUI Components
import {
    Box,
    Card,
    CardActions,
    Chip,
    TextField,
    Button,
    Tooltip,
    IconButton,
    ClickAwayListener,
    CardHeader,
    Dialog,
} from "@mui/material";

// MUI Button Components
import DeleteIcon from "@mui/icons-material/Delete";
import ArchiveIcon from "@mui/icons-material/Archive";
import ColorLensIcon from "@mui/icons-material/ColorLens";
import LabelIcon from "@mui/icons-material/Label";
import PushPinIcon from "@mui/icons-material/PushPin";
import PushPinOutlinedIcon from "@mui/icons-material/PushPinOutlined";

const CreateNote = ({ background, isOpen }) => {
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [bgColor, setBgColor] = useState(background);
    const [labels, setLabels] = useState([]);
    const [pinned, setPinned] = useState(false);
    const [open, setOpen] = useState(true);
    const { user } = useContext(Context);

    // toggling pin
    const handlePinned = () => {
        setPinned(!pinned);
    };

    // Saving note to database
    const handleClose = () => {
        if (title === "" && body === "") {
            setOpen(false);
        } else {
            const rotate = Math.floor(Math.random() * (5 - -5) + -5);
            const notesInfo = {
                email: user.email,
                title,
                body,
                bgColor,
                labels,
                pinned,
                rotate,
                type: "home",
            };

            axios
                .post("http://localhost:8000/createNote", notesInfo)
                .then((res) => {
                    window.location = "/home";
                })
                .catch((err) => {
                    alert("Error in creating note");
                });
            setOpen(false);
        }
    };

    // Delete the selected Label from the note
    const handleDeleteLabel = (label) => {
        // Remove label from the note
        const newLabels = labels.filter((l) => l !== label);
        setLabels(newLabels);
    };

    return (
        <Dialog
            open={open}
            // onClose={handleClose}
            fullWidth
            sx={{ height: "60vh" }}
        >
            <ClickAwayListener onClickAway={handleClose}>
                <Card>
                    <Box
                        p={2}
                        pb={0}
                        sx={{ position: "relative", backgroundColor: bgColor }}
                    >
                        <CardHeader
                            action={
                                <IconButton onClick={handlePinned}>
                                    {pinned ? (
                                        <PushPinIcon sx={{ fontSize: 20 }} />
                                    ) : (
                                        <PushPinOutlinedIcon
                                            sx={{
                                                fontSize: 20,
                                            }}
                                        />
                                    )}
                                </IconButton>
                            }
                            sx={{
                                position: "absolute",
                                top: 0,
                                right: 0,
                            }}
                        />
                        <TextField
                            variant="standard"
                            placeholder="Title"
                            multiline
                            autoFocus
                            size="small"
                            value={title}
                            InputProps={{ disableUnderline: true }}
                            sx={{ paddingBottom: 2, width: "90%" }}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                        <TextField
                            variant="standard"
                            placeholder="Take a note..."
                            fullWidth
                            multiline
                            value={body}
                            InputProps={{ disableUnderline: true }}
                            sx={{ paddingBottom: 2 }}
                            onChange={(e) => setBody(e.target.value)}
                        />
                        <Box sx={{ paddingX: 1 }}>
                            {labels.map((label) => (
                                <Chip
                                    label={label}
                                    size="small"
                                    onDelete={() => handleDeleteLabel(label)}
                                    sx={{ padding: 0, marginRight: 1 }}
                                />
                            ))}
                        </Box>
                        <CardActions
                            sx={{
                                display: "flex",
                                flexDirection: "row",
                                position: "relative",
                            }}
                        >
                            <Tooltip title="delete">
                                <IconButton>
                                    <DeleteIcon
                                        sx={{
                                            fontSize: 20,
                                        }}
                                    />
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="archive">
                                <IconButton>
                                    <ArchiveIcon
                                        sx={{
                                            fontSize: 20,
                                        }}
                                    />
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="background color">
                                <IconButton>
                                    <ColorLensIcon
                                        sx={{
                                            fontSize: 20,
                                        }}
                                    />
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="labels">
                                <IconButton>
                                    <LabelIcon
                                        sx={{
                                            fontSize: 20,
                                        }}
                                    />
                                </IconButton>
                            </Tooltip>
                            <Button
                                variant="text"
                                onClick={handleClose}
                                sx={{
                                    position: "absolute",
                                    right: 0,
                                    bottom: "0.25em",
                                    color: "black", // TODO: Align Button to right
                                }}
                            >
                                Close
                            </Button>
                        </CardActions>
                    </Box>
                </Card>
            </ClickAwayListener>
        </Dialog>
    );
};

export default CreateNote;
