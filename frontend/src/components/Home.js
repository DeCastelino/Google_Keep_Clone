import { useState, useEffect, useContext } from "react";
import axios from "axios";

// Custom Components
import Navbar from "./Navbar";
import CardsLayout from "./CardsLayout";
import CreateNote from "./CreateNote";

import { Context } from "./Context/userContext";

const Home = () => {
    const [notes, setNotes] = useState([]);
    const { user, setUser } = useContext(Context);

    useEffect(() => {
        console.log("User: ", user);
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
