// MUI Components
import { Menu, MenuItem } from "@mui/material";

const LabelDropdown = ({ anchorElLabel, handleCloseLabelMenu }) => {
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
