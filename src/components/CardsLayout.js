import { useEffect } from "react";

// MUI Components
import { Grid } from "@mui/material";

// Custom Components
import Data from "../Data.json";
import NoteCard from "./NoteCard";

const CardsLayout = () => {
    useEffect(() => {
        console.log(Data);
    }, []);
    return (
        <Grid container spacing={3} pl={5} pr={2}>
            {Data.map((item, index) => (
                <Grid item xs={6} md={3} lg={2.3}>
                    <NoteCard item={item} index={index} />
                </Grid>
            ))}
        </Grid>
    );
};

export default CardsLayout;
