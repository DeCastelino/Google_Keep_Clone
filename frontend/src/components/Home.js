import { useState, useEffect } from "react";
import axios from "axios";

// Custom Components
import Navbar from "./Navbar";
import CardsLayout from "./CardsLayout";
import CreateNote from "./CreateNote";

const Home = () => {
    const [notes, setNotes] = useState([]);

    useEffect(() => {
        axios
            .get("http://localhost:8000")
            .then((res) => {
                console.log("Notes: ", res.data);
                setNotes(res.data);
            })
            .catch((err) => {
                alert("Error in fetching notes");
            });
    }, []);

    return (
        <div>
            <Navbar active={"home"} />
            <CreateNote />
            <CardsLayout notes={notes} />
        </div>
    );
};

export default Home;
