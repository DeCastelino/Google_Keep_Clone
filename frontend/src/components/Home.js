// React Components
import { useState, useEffect, useContext } from "react";

// NPM Components
import axios from "axios";

// Custom Components
import Navbar from "./Navbar";
import CardsLayout from "./CardsLayout";
import CreateNote from "./CreateNote";
import { Context } from "./Context/userContext";

const Home = () => {
    const { user } = useContext(Context);
    const [notes, setNotes] = useState([]);
    const [labels, setLabels] = useState([]);

    useEffect(() => {
        axios
            .get(`http://localhost:8000/getHomeNotes/${user.email}`)
            .then((res) => {
                setNotes(res.data);
            })
            .catch((err) => {
                alert("Error in fetching notes");
            });
        axios
            .get(`http://localhost:8000/getLabels/${user.email}`)
            .then((res) => {
                setLabels(res.data);
            })
            .catch((err) => {
                alert("Unable to fetch labels");
            });
    }, []);

    return (
        <div>
            <Navbar active={"home"} />
            <CardsLayout notes={notes} labels={labels} />
        </div>
    );
};

export default Home;
