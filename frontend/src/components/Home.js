import { useState, useEffect, useContext } from "react";
import axios from "axios";

// Custom Components
import Navbar from "./Navbar";
import CardsLayout from "./CardsLayout";
import CreateNote from "./CreateNote";
import { Context } from "./Context/userContext";
const Home = () => {
    const { user } = useContext(Context);
    const [notes, setNotes] = useState([]);

    useEffect(() => {
        axios
            .get(`http://localhost:8000/getHomeNotes/${user.email}`)
            .then((res) => {
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
