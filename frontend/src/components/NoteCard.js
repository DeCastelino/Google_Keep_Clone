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
import DeleteIcon from "@mui/icons-material/Delete";
import ArchiveIcon from "@mui/icons-material/Archive";
import ColorLensIcon from "@mui/icons-material/ColorLens";
import PushPinIcon from "@mui/icons-material/PushPin";
import PushPinOutlinedIcon from "@mui/icons-material/PushPinOutlined";
import IconButton from "@mui/material/IconButton";
import axios from "axios";

const NoteCard = ({ note, key }) => {
    const [pinned, setPinned] = useState(false);
    const [variant, setVariant] = useState("outlined");
    const [activeColor, setActiveColor] = useState("#ffffff"); // white

    // toggling pin
    const handlePinned = () => {
        setPinned(!pinned);
    };

    const onMouseOver = () => {
        setActiveColor("iconColorActive");
        setVariant("elevation");
    };
    const onMouseOut = () => {
        setActiveColor("#ffffff"); // white
        setVariant("outlined");
    };

    const handleDeleteLabel = (label) => {
        const labelInfo = { labelValue: label };
        axios
            .post(`http://localhost:8000/${note.id}`, labelInfo)
            .then((result) => {
                window.location.reload();
            })
            .catch(() => {
                alert("Unable to delete label");
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
                    <IconButton>
                        <DeleteIcon
                            variant="outlined"
                            sx={{ fontSize: 20, color: activeColor }}
                        />
                    </IconButton>
                </Tooltip>
                <Tooltip title="archive">
                    <IconButton>
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
            </CardActions>
        </Card>
    );
};

export default NoteCard;
