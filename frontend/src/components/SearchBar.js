// React Components
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// NPM Components
import axios from "axios";

// MUI Components
import { styled, Box, TextField, InputAdornment } from "@mui/material";

// MUI Icons Components
import SearchIcon from "@mui/icons-material/Search";
const Search = styled(Box)`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    position: relative;
    border-radius: 10px;
    margin: 0px 20px;
    width: 50%;
    background-color: #f2f2f2;
`;

const SearchBar = () => {
    const [search, setSearch] = useState("");
    const navigate = useNavigate();

    // Setting custom URL based on the search term.
    useEffect(() => {
        if (search === "") {
            navigate("/");
        } else {
            navigate(`/search?value=${search}`);
        }
    }, [search]);

    return (
        <Search>
            <TextField
                variant="standard"
                placeholder="Search..."
                sx={{ paddingLeft: 2, paddingY: 1 }}
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
    );
};

export default SearchBar;
