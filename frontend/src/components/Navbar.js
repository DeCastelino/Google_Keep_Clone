import * as React from "react";
import { useState, useEffect, useContext } from "react";
import { styled } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import InputBase from "@mui/material/InputBase";
import CssBaseline from "@mui/material/CssBaseline";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import PropTypes from "prop-types";
import Zoom from "@mui/material/Zoom";
import Fab from "@mui/material/Fab";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import SearchIcon from "@mui/icons-material/Search";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import ArchiveIcon from "@mui/icons-material/Archive";
import RefreshIcon from "@mui/icons-material/Refresh";
import HomeIcon from "@mui/icons-material/Home";
import LabelIcon from "@mui/icons-material/Label";
import LabelOutlinedIcon from "@mui/icons-material/LabelOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import DeleteIcon from "@mui/icons-material/Delete";
import ArchiveOutlinedIcon from "@mui/icons-material/ArchiveOutlined";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { Context } from "./Context/userContext";
import { Dialog } from "@mui/material";
import Settings from "./Setting";
import LabelDropdown from "./LabelDropdown";

const AccountButton = styled(Button)`
    padding: 0px 10px;
    border-color: lightgray;
    color: gray;
    &:hover {
        background-color: offwhite;
        border-color: lightgray;
    }
`;

function ScrollTop(props) {
    const { children, window } = props;
    // Note that you normally won't need to set the window ref as useScrollTrigger
    // will default to window.
    // This is only being set here because the demo is in an iframe.
    const scrollTopTrigger = useScrollTrigger({
        target: window ? window() : undefined,
        disableHysteresis: true,
        threshold: 100,
    });

    const handleClick = (event) => {
        const anchor = (event.target.ownerDocument || document).querySelector(
            "#back-to-top-anchor"
        );

        if (anchor) {
            anchor.scrollIntoView({
                behavior: "smooth",
                block: "center",
            });
        }
    };

    return (
        <Zoom in={scrollTopTrigger}>
            <Box
                onClick={handleClick}
                role="presentation"
                sx={{ position: "fixed", bottom: 16, right: 16 }}
            >
                {children}
            </Box>
        </Zoom>
    );
}

ScrollTop.propTypes = {
    children: PropTypes.element.isRequired,
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window: PropTypes.func,
};

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

    return React.cloneElement(children, {
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

const Search = styled("div")(({ theme }) => ({
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: "#f2f2f2",
    "&:hover": {
        backgroundColor: "#f2f2f2",
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "10px",
    [theme.breakpoints.up("sm")]: {
        marginLeft: theme.spacing(3),
        width: "75ch",
    },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: "inherit",
    "& .MuiInputBase-input": {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create("width"),
        minWidth: "120px",
        [theme.breakpoints.up("md")]: {
            width: "75ch",
        },
    },
}));

const handleRefresh = () => {
    window.location.reload();
};

const Navbar = (props) => {
    const { user, setUser } = useContext(Context);
    const [anchorElUser, setAnchorElUser] = useState(null);
    const [anchorElLabel, setAnchorElLabel] = useState(null);
    const [active, setActive] = useState(props.active);
    const [open, setOpen] = useState(false);

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
        <React.Fragment>
            <CssBaseline />
            <ElevationScroll {...props}>
                <AppBar
                    position="sticky"
                    color="transparent"
                    sx={{ backdropFilter: "blur(100px)" }}
                >
                    <Container maxWidth="xl">
                        <Toolbar disableGutters>
                            <NavLink
                                to="/"
                                style={{
                                    textDecoration: "none",
                                    color: "black",
                                }}
                            >
                                <Typography
                                    variant="h6"
                                    noWrap
                                    component="div"
                                    sx={{
                                        mr: 2,
                                        display: { xs: "none", md: "flex" },
                                    }}
                                >
                                    NOTES
                                </Typography>
                            </NavLink>
                            <Box
                                sx={{
                                    flexGrow: 1,
                                    display: { xs: "none", md: "flex" },
                                    pl: 4,
                                    alignItems: "center",
                                }}
                            >
                                <Search sx={{ width: "100%" }}>
                                    <SearchIconWrapper>
                                        <SearchIcon />
                                    </SearchIconWrapper>
                                    <StyledInputBase
                                        placeholder="Search…"
                                        inputProps={{ "aria-label": "search" }}
                                    />
                                </Search>
                            </Box>

                            <Box
                                sx={{
                                    display: "flex",
                                    flexGrow: 0,
                                    alignItems: "center",
                                }}
                            >
                                <Tooltip title="Refresh">
                                    <RefreshIcon
                                        onClick={handleRefresh}
                                        sx={{
                                            cursor: "pointer",
                                            marginRight: 5,
                                            fontSize: 30,
                                            color: "#5F6368",
                                        }}
                                    />
                                </Tooltip>
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
                                    {active === "label" ? (
                                        <LabelIcon
                                            sx={{
                                                cursor: "pointer",
                                                marginRight: 5,
                                                fontSize: 30,
                                                color: "#5F6368",
                                            }}
                                            onClick={handleOpenLabelMenu}
                                        />
                                    ) : (
                                        <LabelOutlinedIcon
                                            sx={{
                                                cursor: "pointer",
                                                marginRight: 5,
                                                fontSize: 30,
                                                color: "#5F6368",
                                            }}
                                            onClick={handleOpenLabelMenu}
                                        />
                                    )}
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
                                    <Box
                                        sx={{
                                            display: "flex",
                                            flexDirection: "column",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            paddingX: 6,
                                            paddingY: 2,
                                        }}
                                    >
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
                                    </Box>
                                </Menu>
                                <Settings
                                    open={open}
                                    toggleSettings={toggleSettings}
                                />
                            </Box>
                        </Toolbar>
                    </Container>
                    <Divider />
                </AppBar>
            </ElevationScroll>
            <Toolbar id="back-to-top-anchor" />
            <ScrollTop {...props}>
                <Fab
                    color="secondary"
                    size="medium"
                    aria-label="scroll back to top"
                >
                    <KeyboardArrowUpIcon />
                </Fab>
            </ScrollTop>
        </React.Fragment>
    );
};
export default Navbar;
