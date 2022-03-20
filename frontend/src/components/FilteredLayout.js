// React Components
import { useState, useEffect, useContext } from "react";

// NPM Components
import axios from "axios";
import Masonry from "react-masonry-css";

// Custom Components
import { Context } from "./Context/userContext";
import NoteCard from "./NoteCard";
import ArchivedNoteCard from "./ArchivedNoteCard";

// MUI Components
import { Typography, Box } from "@mui/material";

const FilteredLayout = ({ selectedLabel }) => {
    const { user } = useContext(Context);
    const [pinnedNotes, setPinnedNotes] = useState([]);
    const [notes, setNotes] = useState([]);
    const [archivedNotes, setArchivedNotes] = useState([]);
    const [labelsList, setLabelsList] = useState([]);

    // Fetching all notes that have the searched label
    useEffect(() => {
        axios
            .get(`http://localhost:8000/getNotes/${selectedLabel}`)
            .then((res) => {
                const allNotes = res.data;
                const pinnedCards = allNotes.filter(
                    (note) => note.pinned === true
                );
                const archivedNotes = allNotes.filter(
                    (note) => note.type === "archived"
                );
                const notes = allNotes.filter(
                    (note) => note.type === "home" && note.pinned === false
                );
                setPinnedNotes(pinnedCards);
                setArchivedNotes(archivedNotes);
                setNotes(notes);
            });
        // Fetch all labels for this user
        axios
            .get(`http://localhost:8000/getLabels/${user.email}`)
            .then((res) => {
                setLabelsList(res.data);
            })
            .catch((err) => {
                alert("Unable to fetch labels");
            });
    }, []);

    const breakpointColumnsObj = {
        default: 5,
        1400: 4,
        1100: 3,
        700: 2,
        500: 1,
    };

    return (
        <Box sx={{ dispaly: "flex", flexDirection: "column", marginX: "3em" }}>
            {}
            {pinnedNotes.length > 0 && (
                <Box>
                    <Typography variant="h6" mb={3} ml={5}>
                        PINNED
                    </Typography>
                    <Masonry
                        breakpointCols={breakpointColumnsObj}
                        className="my-masonry-grid"
                        columnClassName="my-masonry-grid_column"
                        sx={{ paddingX: 1 }}
                    >
                        {pinnedNotes.map((note) => (
                            <NoteCard
                                note={note}
                                labels={note.labels}
                                key={note.id}
                            />
                        ))}
                    </Masonry>
                </Box>
            )}
            {notes.length > 0 && (
                <Box>
                    <Typography variant="h6" mb={3} ml={5}>
                        OTHERS
                    </Typography>
                    <Masonry
                        breakpointCols={breakpointColumnsObj}
                        className="my-masonry-grid"
                        columnClassName="my-masonry-grid_column"
                        sx={{ paddingX: 1 }}
                    >
                        {notes.map((note) => (
                            <NoteCard
                                note={note}
                                labels={note.labels}
                                key={note.id}
                            />
                        ))}
                    </Masonry>
                </Box>
            )}
            {archivedNotes.length > 0 && (
                <Box>
                    <Typography variant="h6" mb={3} ml={5}>
                        ARCHIVED
                    </Typography>
                    <Masonry
                        breakpointCols={breakpointColumnsObj}
                        className="my-masonry-grid"
                        columnClassName="my-masonry-grid_column"
                        sx={{ paddingX: 1 }}
                    >
                        {archivedNotes.map((note) => (
                            <ArchivedNoteCard note={note} key={note.id} />
                        ))}
                    </Masonry>
                </Box>
            )}
        </Box>
    );
};

export default FilteredLayout;
