// React Components
import { useEffect, useState, useContext } from "react";

// NPM Components
import axios from "axios";

// Custom Components
import Navbar from "./Navbar";
import CardsLayout from "./CardsLayout";
import { Context } from "./Context/userContext";
import { Box, Typography } from "@mui/material";

// MUI Icons Component
import ArchiveOutlinedIcon from "@mui/icons-material/ArchiveOutlined";

const Archive = () => {
    const { user } = useContext(Context);
    const [notes, setNotes] = useState([]);

    useEffect(() => {
        axios
            .get(`http://localhost:8000/getArchivedNotes/${user.email}`)
            .then((res) => {
                setNotes(res.data);
            })
            .catch((err) => {
                alert("Error in fetching archived notes");
            });
    }, []);

    return (
        <div>
            <Navbar active={"archive"} />
            {notes.length > 0 ? (
                <CardsLayout notes={notes} />
            ) : (
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <ArchiveOutlinedIcon
                        // color="lightgrey"
                        sx={{ height: 150, width: 150, color: "lightgrey" }}
                    />
                    <Typography pt={3} variant="h4" color="gray">
                        Your archived notes appear here
                    </Typography>
                </Box>
            )}
        </div>
    );
};

export default Archive;
