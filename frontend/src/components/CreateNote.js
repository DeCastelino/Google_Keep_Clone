// React Components
import { useContext, useState } from "react";

// NPM Components
import axios from "axios";

// Custom Components
import { Context } from "./Context/userContext";

// MUI Components
import {
    Box,
    Card,
    CardActions,
    Grid,
    TextField,
    Typography,
    Button,
    Tooltip,
    IconButton,
    ClickAwayListener,
    CardHeader,
} from "@mui/material";

// MUI Button Components
import DeleteIcon from "@mui/icons-material/Delete";
import ArchiveIcon from "@mui/icons-material/Archive";
import ColorLensIcon from "@mui/icons-material/ColorLens";
import LabelIcon from "@mui/icons-material/Label";
import PushPinIcon from "@mui/icons-material/PushPin";
import PushPinOutlinedIcon from "@mui/icons-material/PushPinOutlined";

const CreateNote = () => {
    const [active, setActive] = useState(false);
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [bgColor, setBgColor] = useState("#ffffff"); // white
    const [labels, setLabels] = useState([]);
    const [pinned, setPinned] = useState(false);
    const { user } = useContext(Context);

    const handleCreateNote = () => {
        setActive(true);
    };

    // toggling pin
    const handlePinned = () => {
        setPinned(!pinned);
    };

    // Saving note to database
    const handleClose = () => {
        if (title === "" && body === "") {
            setActive(false);
        } else {
            const notesInfo = {
                email: user.email,
                title,
                body,
                bgColor,
                labels,
                pinned,
                type: "home",
            };
            console.log(notesInfo);
            axios
                .post("http://localhost:8000/createNote", notesInfo)
                .then((res) => {
                    window.location = "/home";
                })
                .catch((err) => {
                    alert("Error in creating note");
                });
            setActive(false);
        }
    };

    return (
        <Grid
            container
            sx={{
                alignItems: "center",
                justifyContent: "center",
                paddingBottom: 5,
            }}
        >
            <Grid item xs={6} md={6} lg={5}>
                <ClickAwayListener onClickAway={handleClose}>
                    <Card
                        raised
                        sx={{ borderRadius: 2, backgroundColor: bgColor }}
                        onClick={handleCreateNote}
                    >
                        {!active ? (
                            <Typography p={2}>Take a note...</Typography>
                        ) : (
                            <Box p={2} pb={0} sx={{ position: "relative" }}>
                                <CardHeader
                                    action={
                                        <IconButton onClick={handlePinned}>
                                            {pinned ? (
                                                <PushPinIcon
                                                    sx={{ fontSize: 20 }}
                                                />
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
                                    autoFocus
                                    multiline
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
                                <CardActions
                                    sx={{
                                        display: "flex",
                                        flexDirection: "row",
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
                                            color: "gray", // TODO: Align Button to right
                                        }}
                                    >
                                        Close
                                    </Button>
                                </CardActions>
                            </Box>
                        )}
                    </Card>
                </ClickAwayListener>
            </Grid>
        </Grid>
    );
};

export default CreateNote;
