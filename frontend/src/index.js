// React Components
import React from "react";
import ReactDOM from "react-dom";

// Custom Components
import App from "./App";
import { UserContext } from "./components/Context/userContext";

// CSS Components
import "./index.css";

ReactDOM.render(
    <React.StrictMode>
        <UserContext>
            <App />
        </UserContext>
    </React.StrictMode>,
    document.getElementById("root")
);
