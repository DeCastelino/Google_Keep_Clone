// React Components
import { useContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Custom Components
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Archive from "./components/Archive";
import Trash from "./components/Trash";
import SearchLabel from "./components/SearchLabel";
import Search from "./components/Search";
import { Context } from "./components/Context/userContext";

// MUI components
import { createTheme, ThemeProvider } from "@material-ui/core";

const theme = createTheme({
    palette: {
        primary: {
            main: "#ffffff", // white
        },
        secondary: {
            main: "#000000", // black
        },
        iconColorActive: "#afb3b0", // light grey
        iconColorDisabled: "#ffffff", // white
    },
});

function App() {
    const { user } = useContext(Context);
    return (
        <div className="App">
            <ThemeProvider theme={theme}>
                <Router>
                    <Routes>
                        <Route
                            exact
                            path="/"
                            element={user ? <Home /> : <Login />}
                        />
                        <Route
                            path="/home"
                            element={user ? <Home /> : <Login />}
                        />
                        <Route
                            path="/archive"
                            element={user ? <Archive /> : <Login />}
                        />
                        <Route
                            path="/trash"
                            element={user ? <Trash /> : <Login />}
                        />
                        <Route
                            path="/sign-up"
                            element={user ? <Home /> : <Signup />}
                        />
                        <Route
                            path="/login"
                            element={user ? <Home /> : <Login />}
                        />
                        <Route
                            path="/label"
                            element={user ? <SearchLabel /> : <Login />}
                        />
                        <Route
                            path="/?search"
                            element={user ? <Search /> : <Login />}
                        />
                        <Route path="*" element={user ? <Home /> : <Login />} />
                    </Routes>
                </Router>
            </ThemeProvider>
        </div>
    );
}

export default App;
