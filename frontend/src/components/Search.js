import { useState, useEffect } from "react";

import FilteredLayout from "./FilteredLayout";
import Navbar from "./Navbar";

const Search = () => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const selectedLabel = urlParams.get("value");
    console.log(selectedLabel);

    return (
        <>
            <Navbar />
            <FilteredLayout selectedLabel={selectedLabel} />
        </>
    );
};

export default Search;
