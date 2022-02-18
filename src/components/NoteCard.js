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

    // toggling pin
    const handlePinned = () => {
        setPinned(!pinned);
    };

    return (
        <Card variant="outlined" p={1} sx={{ borderRadius: 2 }}>
            <CardHeader
                title={item.title}
                action={
                    <IconButton onClick={handlePinned}>
                        {pinned ? (
                            <PushPinIcon
                                color="iconColor"
                                sx={{ fontSize: 20 }}
                            />
                        ) : (
                            <PushPinOutlinedIcon
                                color="iconColor"
                                sx={{ fontSize: 20 }}
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
                            color="iconColor"
                            sx={{ fontSize: 20 }}
                        />
                    </IconButton>
                </Tooltip>
                <Tooltip title="archive">
                    <IconButton>
                        <ArchiveIcon color="iconColor" sx={{ fontSize: 20 }} />
                    </IconButton>
                </Tooltip>
                <Tooltip title="background color">
                    <IconButton>
                        <ColorLensIcon
                            color="iconColor"
                            sx={{ fontSize: 20 }}
                        />
                    </IconButton>
                </Tooltip>
            </CardActions>
        </Card>
    );
};

export default NoteCard;
