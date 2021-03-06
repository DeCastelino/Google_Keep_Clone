// React Components
import { cloneElement, useState, useContext } from "react";
import { NavLink } from "react-router-dom";

// Custom Components
import { Context } from "./Context/userContext";
import Settings from "./Setting";
import LabelDropdown from "./LabelDropdown";
import SearchBar from "./SearchBar";

// MUI Components
import {
    AppBar,
    Toolbar,
    Box,
    Typography,
    useScrollTrigger,
    Divider,
    Button,
    IconButton,
    Avatar,
    Tooltip,
    Menu,
    styled,
    TextField,
    InputAdornment,
} from "@mui/material";
import PropTypes from "prop-types";

// MUI Icons Components
import ArchiveIcon from "@mui/icons-material/Archive";
import HomeIcon from "@mui/icons-material/Home";
import LabelOutlinedIcon from "@mui/icons-material/LabelOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import DeleteIcon from "@mui/icons-material/Delete";
import ArchiveOutlinedIcon from "@mui/icons-material/ArchiveOutlined";
import SearchIcon from "@mui/icons-material/Search";

const AccountButton = styled(Button)`
    padding: 0px 10px;
    border-color: lightgray;
    color: gray;
    &:hover {
        background-color: offwhite;
        border-color: lightgray;
    }
`;

const Search = styled(Box)`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    position: relative;
    border-radius: 10px;
    margin: 0px 20px;
    width: 50%;
    background-color: white;
`;

const MenuBox = styled("div")`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: #e8eae7;
    margin: -8px 0px;
    padding: 2ch 6ch;
`;

function ElevationScroll(props) {
    const { children, window } = props;
    // Note that you normally won't need to set the window ref as useScrollTrigger
    // will default to window.
    // This is only being set here because the demo is in an iframe.
    const elevationScrollTrigger = useScrollTrigger({
        disableHysteresis: true,
        threshold: 0,
        target: window ? window() : undefined,
    });

    return cloneElement(children, {
        elevation: elevationScrollTrigger ? 4 : 0,
    });
}

ElevationScroll.propTypes = {
    children: PropTypes.element.isRequired,
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window: PropTypes.func,
};

const Navbar = (props) => {
    const { user, setUser } = useContext(Context);
    const [anchorElUser, setAnchorElUser] = useState(null);
    const [anchorElLabel, setAnchorElLabel] = useState(null);
    const [active, setActive] = useState(props.active);
    const [open, setOpen] = useState(false);
    const [search, setSearch] = useState("");

    const handleLogout = () => {
        setUser(null);
        window.location.href = "/login";
    };

    const toggleSettings = () => {
        setOpen(!open);
    };

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleOpenLabelMenu = (event) => {
        setAnchorElLabel(event.currentTarget);
    };

    const handleCloseLabelMenu = () => {
        setAnchorElLabel(null);
    };

    return (
        <>
            <ElevationScroll {...props}>
                <AppBar
                    position="sticky"
                    color="transparent"
                    sx={{
                        marginBottom: "3em",
                    }}
                >
                    <Toolbar
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                        }}
                    >
                        <NavLink
                            to="/"
                            style={{
                                textDecoration: "none",
                                color: "black",
                            }}
                        >
                            <Typography
                                variant="h4"
                                noWrap
                                component="div"
                                style={{
                                    fontFamily: "Lobster",
                                    cursive: true,
                                }}
                            >
                                Jot-It
                            </Typography>
                        </NavLink>
                        <Search>
                            <TextField
                                variant="standard"
                                placeholder="Search..."
                                sx={{
                                    paddingLeft: 2,
                                    paddingY: 1,
                                }}
                                fullWidth
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <SearchIcon />
                                        </InputAdornment>
                                    ),
                                    disableUnderline: true,
                                }}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </Search>
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "flex-end",
                            }}
                        >
                            <Tooltip title="Home">
                                <NavLink
                                    to="/home"
                                    style={{
                                        textDecoration: "none",
                                        color: "black",
                                    }}
                                >
                                    {active === "home" ? (
                                        <HomeIcon
                                            sx={{
                                                cursor: "pointer",
                                                marginRight: 5,
                                                fontSize: 30,
                                                color: "#5F6368",
                                            }}
                                        />
                                    ) : (
                                        <HomeOutlinedIcon
                                            sx={{
                                                cursor: "pointer",
                                                marginRight: 5,
                                                fontSize: 30,
                                                color: "#5F6368",
                                            }}
                                        />
                                    )}
                                </NavLink>
                            </Tooltip>
                            <Tooltip title="Archive">
                                <NavLink
                                    to="/archive"
                                    style={{
                                        textDecoration: "none",
                                        color: "black",
                                    }}
                                >
                                    {active === "archive" ? (
                                        <ArchiveIcon
                                            sx={{
                                                cursor: "pointer",
                                                marginRight: 5,
                                                fontSize: 30,
                                                color: "#5F6368",
                                            }}
                                        />
                                    ) : (
                                        <ArchiveOutlinedIcon
                                            sx={{
                                                cursor: "pointer",
                                                marginRight: 5,
                                                fontSize: 30,
                                                color: "#5F6368",
                                            }}
                                        />
                                    )}
                                </NavLink>
                            </Tooltip>
                            <Tooltip title="Label">
                                <LabelOutlinedIcon
                                    sx={{
                                        cursor: "pointer",
                                        marginRight: 5,
                                        fontSize: 30,
                                        color: "#5F6368",
                                    }}
                                    onClick={handleOpenLabelMenu}
                                />
                            </Tooltip>
                            <LabelDropdown
                                anchorElLabel={anchorElLabel}
                                handleCloseLabelMenu={handleCloseLabelMenu}
                            />
                            <Tooltip title="Trash">
                                <NavLink
                                    to="/trash"
                                    style={{
                                        textDecoration: "none",
                                        color: "black",
                                    }}
                                >
                                    {active === "trash" ? (
                                        <DeleteIcon
                                            sx={{
                                                cursor: "pointer",
                                                marginRight: 5,
                                                fontSize: 30,
                                                color: "#5F6368",
                                            }}
                                        />
                                    ) : (
                                        <DeleteOutlineIcon
                                            sx={{
                                                cursor: "pointer",
                                                marginRight: 5,
                                                fontSize: 30,
                                                color: "#5F6368",
                                            }}
                                        />
                                    )}
                                </NavLink>
                            </Tooltip>
                            <Tooltip title="Open Profile">
                                <IconButton
                                    onClick={handleOpenUserMenu}
                                    sx={{ p: 0 }}
                                >
                                    <Avatar
                                        src={user.profilePicture}
                                        sx={{ width: 35, height: 35 }}
                                    />
                                </IconButton>
                            </Tooltip>
                            <Menu
                                sx={{
                                    mt: "45px",
                                    padding: 0,
                                }}
                                id="menu-appbar"
                                anchorEl={anchorElUser}
                                anchorOrigin={{
                                    vertical: "top",
                                    horizontal: "right",
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: "top",
                                    horizontal: "right",
                                }}
                                open={Boolean(anchorElUser)}
                                onClose={handleCloseUserMenu}
                            >
                                <MenuBox>
                                    <Avatar
                                        src={user.profilePicture}
                                        sx={{
                                            width: 100,
                                            height: 100,
                                            alignContent: "center",
                                        }}
                                    />
                                    <Typography
                                        variant="subtitle1"
                                        color="gray"
                                        align="center"
                                        paddingTop={1}
                                    >
                                        {user.email}
                                    </Typography>
                                    <AccountButton
                                        variant="outlined"
                                        sx={{
                                            borderRadius: 20,
                                            marginY: 3,
                                            paddingX: 3,
                                        }}
                                        onClick={toggleSettings}
                                    >
                                        Manage your account
                                    </AccountButton>
                                    <AccountButton
                                        variant="outlined"
                                        sx={{
                                            marginBottom: 1,
                                            paddingY: 1,
                                            paddingX: 3,
                                        }}
                                        onClick={handleLogout}
                                    >
                                        Logout
                                    </AccountButton>
                                </MenuBox>
                            </Menu>
                            <Settings
                                open={open}
                                toggleSettings={toggleSettings}
                            />
                        </Box>
                    </Toolbar>
                    <Divider />
                </AppBar>
            </ElevationScroll>
        </>
    );
};
export default Navbar;
