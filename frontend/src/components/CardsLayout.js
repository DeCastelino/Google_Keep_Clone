// Custom Components
import NoteCard from "./NoteCard";
import ArchivedNoteCard from "./ArchivedNoteCard";
import TrashNoteCard from "./TrashNoteCard";

// MUI Components
import { Grid } from "@mui/material";

const CardsLayout = ({ notes, labels }) => {
    return (
        <Grid container spacing={3} pl={5} pr={2}>
            {notes.map((note) => (
                <Grid item xs={6} md={3} lg={2.3}>
                    {note.type === "home" && (
                        <NoteCard note={note} labels={labels} key={note.id} />
                    )}
                    {note.type === "archived" && (
                        <ArchivedNoteCard note={note} key={note.id} />
                    )}
                    {note.type === "trash" && (
                        <TrashNoteCard note={note} key={note.id} />
                    )}
                </Grid>
            ))}
        </Grid>
    );
};

export default CardsLayout;
