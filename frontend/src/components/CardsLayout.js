// MUI Components
import { Grid } from "@mui/material";

// Custom Components
import NoteCard from "./NoteCard";

const CardsLayout = ({ notes }) => {
    return (
        <Grid container spacing={3} pl={5} pr={2}>
            {notes.map((note) => (
                <Grid item xs={6} md={3} lg={2.3}>
                    <NoteCard note={note} key={note.id} />
                </Grid>
            ))}
        </Grid>
    );
};

export default CardsLayout;
