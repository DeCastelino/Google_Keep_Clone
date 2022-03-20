// React Components
import { useState, useEffect } from "react";

// NPM Components
import Masonry from "react-masonry-css";

// Custom Components
import NoteCard from "./NoteCard";
import ArchivedNoteCard from "./ArchivedNoteCard";
import TrashNoteCard from "./TrashNoteCard";

// MUI Components
import { Typography, Box } from "@mui/material";

const CardsLayout = ({ notes, labels }) => {
    const [pinnedCards, setPinnedCards] = useState([]);
    const [cards, setCards] = useState([]);

    useEffect(() => {
        const pinnedCards = notes.filter((note) => note.pinned);
        const cards = notes.filter((note) => !note.pinned);
        setPinnedCards(pinnedCards);
        setCards(cards);
    }, [notes]);

    const breakpointColumnsObj = {
        default: 5,
        1400: 4,
        1100: 3,
        700: 2,
        500: 1,
    };

    return (
        <Box sx={{ dispaly: "flex", flexDirection: "column", marginX: "3em" }}>
            {pinnedCards.length > 0 && (
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
                        {pinnedCards.map((note) => (
                            <>
                                {note.type === "home" && (
                                    <NoteCard
                                        note={note}
                                        labels={labels}
                                        key={note.id}
                                    />
                                )}
                                {note.type === "archived" && (
                                    <ArchivedNoteCard
                                        note={note}
                                        key={note.id}
                                    />
                                )}
                                {note.type === "trash" && (
                                    <TrashNoteCard note={note} key={note.id} />
                                )}
                            </>
                        ))}
                    </Masonry>
                </Box>
            )}
            {cards.length > 0 && (
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
                        {cards.map((note) => (
                            <>
                                {note.type === "home" && (
                                    <NoteCard
                                        note={note}
                                        labels={labels}
                                        key={note.id}
                                    />
                                )}
                                {note.type === "archived" && (
                                    <ArchivedNoteCard
                                        note={note}
                                        key={note.id}
                                    />
                                )}
                                {note.type === "trash" && (
                                    <TrashNoteCard note={note} key={note.id} />
                                )}
                            </>
                        ))}
                    </Masonry>
                </Box>
            )}
        </Box>
    );
};

export default CardsLayout;
