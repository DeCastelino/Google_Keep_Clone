// React Components
import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

// NPM Components
import axios from "axios";

// Custom Components
import { Context } from "./Context/userContext";

// MUI Components
import {
    Menu,
    MenuItem,
    TextField,
    InputAdornment,
    MenuList,
    ClickAwayListener,
    IconButton,
} from "@mui/material";

// MUI Icons Components
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";

const LabelDropdown = ({ anchorElLabel, handleCloseLabelMenu }) => {
    const [search, setSearch] = useState("");
    const [labels, setLabels] = useState([]);
    const [filteredLabels, setFilteredLabels] = useState([]);
    const { user } = useContext(Context);

    // fetching all labels from the current user
    useEffect(() => {
        axios
            .get(`http://localhost:8080/getLabels/${user.email}`)
            .then((res) => {
                setLabels(res.data);
                setFilteredLabels(res.data);
            });
    });

    // filtering the labels based on the search query
    useEffect(() => {
        if (search === "") setFilteredLabels(labels);
        else {
            const filtered = labels.filter((label) => {
                return label.toLowerCase().includes(search.toLowerCase());
            });
            setFilteredLabels(filtered);
        }
    }, [search]);

    // resetting search field after closing menu
    const handleClearSearch = () => {
        setSearch("");
    };

    // adding label created by the user to the database and displaying it in the menu
    const handleCreateLabel = () => {
        axios
            .post(`http://localhost:8080/createLabel`, {
                search,
                email: user.email,
            })
            .then((res) => {
                setLabels([...labels, search]);
            })
            .catch((err) => {
                alert(err);
            });
    };

    return (
        <ClickAwayListener onClickAway={handleClearSearch}>
            <Menu
                anchorEl={anchorElLabel}
                anchorOrigin={{
                    vertical: "bottom",
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
                <TextField
                    variant="standard"
                    size="small"
                    placeholder="search label"
                    value={search}
                    sx={{ marginX: "1em" }}
                    InputProps={{
                        disableUnderline: true,
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    onClick={handleClearSearch}
                                    sx={{ padding: 0, margin: 0 }}
                                >
                                    {search === "" ? (
                                        <SearchIcon />
                                    ) : (
                                        <CloseIcon />
                                    )}
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <div>
                    <MenuList>
                        {filteredLabels.map((filteredLabel) => (
                            <MenuItem>
                                <Link
                                    to={`/labelSearch?value=${filteredLabel}`}
                                    style={{
                                        textDecoration: "none",
                                        color: "black",
                                    }}
                                >
                                    {filteredLabel}
                                </Link>
                            </MenuItem>
                        ))}
                        {search !== "" && (
                            <MenuItem onClick={handleCreateLabel}>
                                Create <strong>&nbsp;"{search}"&nbsp;</strong>
                            </MenuItem>
                        )}
                    </MenuList>
                </div>
            </Menu>
        </ClickAwayListener>
    );
};

export default LabelDropdown;
