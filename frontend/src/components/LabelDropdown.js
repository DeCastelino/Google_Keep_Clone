// React Components
import { useEffect, useState } from "react";
import axios from "axios";

// MUI Components
import { Menu, MenuItem } from "@mui/material";

const LabelDropdown = ({ anchorElLabel, handleCloseLabelMenu }) => {
    const [labels, setLabels] = useState([]);

    // useEffect(() => {
    //     axios
    //         .get("http://localhost:8000/getLabels")
    //         .then((result) => {
    //             setLabels(result.data);
    //         })
    //         .catch((error) => {
    //             alert("Unable to fetch labels");
    //         });
    // }, []);

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
            <MenuItem sx={{ paddingX: 2, paddingRight: 3, margin: 0 }}>
                What
            </MenuItem>
        </Menu>
    );
};

export default LabelDropdown;
