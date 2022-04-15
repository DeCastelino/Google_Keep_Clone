// React Components
import { useEffect, useState, useContext } from "react";

// NPM Components
import axios from "axios";

// Custom Components
import Navbar from "./Navbar";
import CardsLayout from "./CardsLayout";
import { Context } from "./Context/userContext";

// MUI Components
import { Box, Typography } from "@mui/material";

// MUI Icons Components
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";

const Trash = () => {
    const { user } = useContext(Context);
    const [notes, setNotes] = useState([]);

    useEffect(() => {
        axios
            .get(`http://localhost:8080/getDeletedNotes/${user.email}`)
            .then((res) => {
                setNotes(res.data);
            })
            .catch((err) => {
                alert("Error in fetching deleted notes");
            });
    }, []);

    return (
        <div>
            <Navbar active={"trash"} />
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
                    <DeleteOutlineOutlinedIcon
                        sx={{ height: 150, width: 150, color: "gray" }}
                    />
                    <Typography pt={3} variant="h4" color="gray">
                        No notes in Trash
                    </Typography>
                </Box>
            )}
        </div>
    );
};

export default Trash;
