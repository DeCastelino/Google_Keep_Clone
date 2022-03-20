import { useState, useEffect } from "react";

import FilteredLayout from "./FilteredLayout";
import Navbar from "./Navbar";

const Search = () => {
    // const [selectedLabel, setSelectedLabel] = useState(null);
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const selectedLabel = urlParams.get("label");
    console.log(selectedLabel);

    return (
        <>
            <Navbar />
            <FilteredLayout selectedLabel={selectedLabel} />
        </>
    );
};

export default Search;
