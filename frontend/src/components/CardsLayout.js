// Custom Components
import NoteCard from "./NoteCard";
import ArchivedNoteCard from "./ArchivedNoteCard";
import TrashNoteCard from "./TrashNoteCard";

// MUI Components
import Masonry from "@mui/lab/Masonry";

const CardsLayout = ({ notes, labels }) => {
    return (
        <Masonry
            columns={{ xs: 1, sm: 2, md: 3, lg: 5, xl: 7 }}
            spacing={3}
            sx={{ paddingLeft: 3 }}
        >
            {notes.map((note) => (
                <>
                    {note.type === "home" && (
                        <NoteCard note={note} labels={labels} key={note.id} />
                    )}
                    {note.type === "archived" && (
                        <ArchivedNoteCard note={note} key={note.id} />
                    )}
                    {note.type === "trash" && (
                        <TrashNoteCard note={note} key={note.id} />
                    )}
                </>
            ))}
        </Masonry>
    );
};

export default CardsLayout;
