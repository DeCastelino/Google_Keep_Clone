import { useState } from "react";
import {
    Card,
    CardActions,
    CardContent,
    CardHeader,
    Tooltip,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ArchiveIcon from "@mui/icons-material/Archive";
import ColorLensIcon from "@mui/icons-material/ColorLens";
import PushPinIcon from "@mui/icons-material/PushPin";
import PushPinOutlinedIcon from "@mui/icons-material/PushPinOutlined";
import IconButton from "@mui/material/IconButton";

const NoteCard = ({ item, index }) => {
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

    return (
        <Card
            variant={variant}
            p={1}
            sx={{ borderRadius: 2 }}
            onMouseOver={onMouseOver}
            onMouseOut={onMouseOut}
            raised
        >
            <CardHeader
                title={item.title}
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
            <CardContent>{item.description}</CardContent>
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
