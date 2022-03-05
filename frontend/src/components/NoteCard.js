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
    Dialog,
    Button,
    TextField,
    ClickAwayListener,
    MenuItem,
    Checkbox,
    Menu,
    MenuList,
    Input,
    InputAdornment,
} from "@mui/material";

// MUI Icons Components
import DeleteIcon from "@mui/icons-material/Delete";
import ArchiveIcon from "@mui/icons-material/Archive";
import ColorLensIcon from "@mui/icons-material/ColorLens";
import PushPinIcon from "@mui/icons-material/PushPin";
import PushPinOutlinedIcon from "@mui/icons-material/PushPinOutlined";
import IconButton from "@mui/material/IconButton";
import LabelIcon from "@mui/icons-material/Label";
import SearchIcon from "@mui/icons-material/Search";

function showCoords(event) {
    const x = event.clientX;
    const y = event.clientY;
    console.log(`Coords: ${x}, ${y}`);
}

const NoteCard = ({ note, labels, key }) => {
    const [pinned, setPinned] = useState(note.pinned);
    const [open, setOpen] = useState(false);
    const [display, setDisplay] = useState("block");
    const [variant, setVariant] = useState("outlined");
    const [activeColor, setActiveColor] = useState("#ffffff"); // white
    const [title, setTitle] = useState(note.title);
    const [body, setBody] = useState(note.body);
    const [bgColor, setBgColor] = useState(note.bgColor);
    const [activeLabels, setActiveLabels] = useState(note.labels);
    const [labelList, setLabelList] = useState(labels);
    const [openLabelMenu, setopenLabelMenu] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const [labelSelect, setLabelSelect] = useState("");

    // Toggling Pin
    const handlePinned = () => {
        axios
            .post("http://localhost:8000/updatePinned", {
                id: note.id,
                pinned: !pinned,
            })
            .then((res) => {
                setPinned(!pinned);
            })
            .catch((err) => {
                alert("Error in pinning note");
            });
    };

    // highlights the note card when mouse is over it
    const onMouseOver = (event) => {
        showCoords(event);
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

    // Archive the selected note
    const handleArchiveNote = () => {
        axios
            .post("http://localhost:8000/archiveNote", { id: note.id })
            .then((result) => {
                window.location.reload();
            })
            .catch(() => {
                alert("Unable to archive note");
            });
    };

    const handleEditNote = () => {
        // Transform the note to make it editable
        setOpen(true);
        setDisplay("none");
    };

    const handleClose = () => {
        const notesInfo = {
            id: note.id,
            title,
            body,
            bgColor,
            pinned,
        };
        axios
            .post("http://localhost:8000/updateNote", notesInfo)
            .then((res) => {
                setOpen(false);
                setDisplay("block");
                window.location.reload();
            })
            .catch((err) => {
                alert("Error in updating note");
            });
    };

    const handleOpenLabelMenu = (event) => {
        setAnchorEl(event.currentTarget);
        setopenLabelMenu((prev) => !prev);
    };

    const handleCloseLabelMenu = () => {
        setAnchorEl(null);
        setopenLabelMenu(false);
    };

    const updateLabel = (label) => {
        return (event) => {
            let labels = [];
            if (event.target.checked) {
                labels = [...activeLabels, label];
            }
            if (!event.target.checked) {
                labels = activeLabels.filter((l) => l !== label);
            }
            axios
                .post(`http://localhost:8000/updateLabel`, {
                    labels,
                    id: note.id,
                })
                .then(() => {
                    setActiveLabels(labels);
                })
                .catch(() => {
                    alert("Error in adding label");
                });
        };
    };

    return (
        <>
            <Card
                variant={variant}
                p={1}
                sx={{ borderRadius: 3, display: display }}
                onMouseOver={onMouseOver}
                onMouseOut={onMouseOut}
                raised
            >
                <CardHeader
                    title={title}
                    action={
                        <IconButton onClick={handlePinned}>
                            {pinned ? (
                                <PushPinIcon
                                    color={activeColor}
                                    sx={{ fontSize: 20 }}
                                />
                            ) : (
                                <PushPinOutlinedIcon
                                    sx={{
                                        fontSize: 20,
                                        color: activeColor,
                                    }}
                                />
                            )}
                        </IconButton>
                    }
                    onClick={handleEditNote}
                />
                <CardContent onClick={handleEditNote}>{body}</CardContent>
                <Box sx={{ paddingX: 1 }}>
                    {activeLabels.map((label) => (
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
                                sx={{ fontSize: 20, color: activeColor }}
                            />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="archive">
                        <IconButton onClick={handleArchiveNote}>
                            <ArchiveIcon
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
                        <IconButton onClick={handleOpenLabelMenu}>
                            <LabelIcon
                                sx={{ fontSize: 20, color: activeColor }}
                            />
                        </IconButton>
                    </Tooltip>
                    <Menu
                        open={openLabelMenu}
                        anchorEl={anchorEl}
                        onClose={handleCloseLabelMenu}
                        sx={{ padding: 0, margin: 0 }}
                    >
                        <Input
                            placeholder="Search Label"
                            value={labelSelect}
                            onChange={(e) => setLabelSelect(e.target.value)}
                            endAdornment={
                                <InputAdornment position="end">
                                    <SearchIcon />
                                </InputAdornment>
                            }
                            sx={{ marginX: 1 }}
                        />
                        <MenuList>
                            {labelList
                                .filter((label) => label.includes(labelSelect))
                                .map((label) => (
                                    <MenuItem sx={{ padding: 0, margin: 0 }}>
                                        {note.labels.includes(label) ? (
                                            <Checkbox
                                                size="small"
                                                checked
                                                onChange={updateLabel(label)}
                                            />
                                        ) : (
                                            <Checkbox
                                                size="small"
                                                onChange={updateLabel(label)}
                                            />
                                        )}
                                        {label}
                                    </MenuItem>
                                ))}
                        </MenuList>
                    </Menu>
                </CardActions>
            </Card>
            <Dialog
                open={open}
                onClose={handleClose}
                fullWidth
                sx={{ height: "60vh" }}
            >
                <ClickAwayListener onClickAway={handleClose}>
                    <Card>
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
                    </Card>
                </ClickAwayListener>
            </Dialog>
        </>
    );
};

export default NoteCard;
