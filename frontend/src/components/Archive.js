// React Components
import { useEffect, useState, useContext } from "react";

// NPM Components
import axios from "axios";

// Custom Components
import Navbar from "./Navbar";
import CardsLayout from "./CardsLayout";
import { Context } from "./Context/userContext";

// MUI Components
import { styled, Box, Typography } from "@mui/material";

// MUI Icons Component
import ArchiveOutlinedIcon from "@mui/icons-material/ArchiveOutlined";

const Archive = () => {
    const { user } = useContext(Context);
    const [notes, setNotes] = useState([]);

    // Fetching Archived Notes
    useEffect(() => {
        axios
            .get(`http://localhost:8080/getArchivedNotes/${user.email}`)
            .then((res) => {
                setNotes(res.data);
            })
            .catch((err) => {
                alert("Error in fetching archived notes");
            });
    }, []);

    return (
        <>
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
                        sx={{ height: 150, width: 150, color: "gray" }}
                    />
                    <Typography pt={3} variant="h4" color="gray">
                        Your archived notes appear here
                    </Typography>
                </Box>
            )}
        </>
    );
};

export default Archive;
