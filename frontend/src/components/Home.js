// React Components
import { useState, useEffect, useContext, useRef } from "react";

// NPM Components
import axios from "axios";

// Custom Components
import Navbar from "./Navbar";
import CardsLayout from "./CardsLayout";
import CreateNote from "./CreateNote";
import { Context } from "./Context/userContext";

import { SpeedDial, SpeedDialAction } from "@mui/material";

import SpeedDialIcon from "@mui/material/SpeedDialIcon";

const Home = () => {
    const { user } = useContext(Context);
    const [notes, setNotes] = useState([]);
    const [labels, setLabels] = useState([]);
    const [bgColor, setBgColor] = useState("");
    const [open, setOpen] = useState(false);
    const isMounted = useRef(false);

    // fetching all notes and labels for this user
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

    useEffect(() => {
        if (isMounted.current) {
            setOpen((prev) => !prev);
        } else {
            isMounted.current = true;
        }
    }, [bgColor]);

    return (
        <>
            <Navbar active={"home"} />
            <CardsLayout notes={notes} labels={labels} />
            <SpeedDial
                ariaLabel="Create New Note"
                sx={{ position: "fixed", bottom: 15, right: 15 }}
                icon={<SpeedDialIcon />}
            >
                <SpeedDialAction
                    sx={{ backgroundColor: "#FF6961" }}
                    tooltipTitle="Red"
                    onClick={() => setBgColor("#FF6961")}
                />
                <SpeedDialAction
                    sx={{ backgroundColor: "#FDFD96" }}
                    tooltipTitle="Yellow"
                    onClick={() => setBgColor("#FDFD96")}
                />
                <SpeedDialAction
                    sx={{ backgroundColor: "#C1E1C1" }}
                    tooltipTitle="Green"
                    onClick={() => setBgColor("#C1E1C1")}
                />
                <SpeedDialAction
                    sx={{ backgroundColor: "#A7C7E7" }}
                    tooltipTitle="Blue"
                    onClick={() => setBgColor("#A7C7E7")}
                />
            </SpeedDial>
            {open && <CreateNote background={bgColor} />}
        </>
    );
};

export default Home;
