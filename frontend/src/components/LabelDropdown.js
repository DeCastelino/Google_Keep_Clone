import { useState } from "react";
import { Checkbox, Menu, MenuItem } from "@mui/material";

const LabelDropdown = ({ anchorElLabel, handleCloseLabelMenu }) => {
    const [checked, setChecked] = useState(false);

    const handleCheck = (event) => {
        setChecked(event.target.checked);
    };

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
            <MenuItem sx={{ paddingLeft: 0, paddingRight: 3, margin: 0 }}>
                <Checkbox checked={checked} onChange={handleCheck} />
                What
            </MenuItem>
            <MenuItem sx={{ paddingLeft: 0, paddingRight: 3, margin: 0 }}>
                <Checkbox checked={checked} onChange={handleCheck} />
                What
            </MenuItem>
            <MenuItem sx={{ paddingLeft: 0, paddingRight: 3, margin: 0 }}>
                <Checkbox checked={checked} onChange={handleCheck} />
                What
            </MenuItem>
            <MenuItem sx={{ paddingLeft: 0, paddingRight: 3, margin: 0 }}>
                <Checkbox checked={checked} onChange={handleCheck} />
                What
            </MenuItem>
        </Menu>
    );
};

export default LabelDropdown;
