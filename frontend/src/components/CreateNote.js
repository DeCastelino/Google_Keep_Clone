import { useState } from "react";
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
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ArchiveIcon from "@mui/icons-material/Archive";
import ColorLensIcon from "@mui/icons-material/ColorLens";
import LabelIcon from "@mui/icons-material/Label";

const CreateNote = () => {
    const [active, setActive] = useState(false);
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [bgColor, setBgColor] = useState("#ffffff"); // white
    const [labels, setLabels] = useState([]);

    const handleCreateNote = () => {
        setActive(true);
    };

    const handleClose = () => {
        if (title === "" && body === "") {
            setActive(false);
        } else {
            const notesInfo = { title, body, bgColor, labels };
            console.log(notesInfo);
            window.location.reload(); // Change it to setActive(false)
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
                            <Box p={2} pb={0}>
                                <TextField
                                    variant="standard"
                                    placeholder="Title"
                                    fullWidth
                                    autoFocus
                                    size="small"
                                    value={title}
                                    InputProps={{ disableUnderline: true }}
                                    sx={{ paddingBottom: 2 }}
                                    onChange={(e) => setTitle(e.target.value)}
                                />
                                <TextField
                                    variant="standard"
                                    placeholder="Take a note..."
                                    fullWidth
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
                                            color: "gray", // Align Button to right
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