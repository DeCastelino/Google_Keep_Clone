// React Components
import { useState, useEffect, useContext } from "react";

// NPM Components
import axios from "axios";

// Custom Components
import { Context } from "./Context/userContext";

// MUI Components
import { Menu, MenuItem } from "@mui/material";

const LabelDropdown = ({ anchorElLabel, handleCloseLabelMenu }) => {
    const [labels, setLabels] = useState([]);
    const { user } = useContext(Context);

    useEffect(() => {
        axios
            .get(`http://localhost:8000/getLabels/${user.email}`)
            .then((res) => {
                setLabels(res.data);
            });
    }, []);
    return (
        <Menu
            sx={{
                mt: "45px",
            }}
            id="menu-appbar"
            anchorEl={anchorElLabel}
            anchorOrigin={{
                vertical: "top",
                horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
                vertical: "top",
                horizontal: "right",
            }}
            open={Boolean(anchorElLabel)}
            onClose={handleCloseLabelMenu}
        >
            {labels.map((label) => (
                <MenuItem sx={{ paddingX: 2, paddingRight: 3, margin: 0 }}>
                    {label}
                </MenuItem>
            ))}
        </Menu>
    );
};

export default LabelDropdown;
