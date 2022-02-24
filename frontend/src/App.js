import { useContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// MUI components
import { createTheme, ThemeProvider } from "@material-ui/core";

// Custom Components
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Profile from "./components/Profile";
import Archive from "./components/Archive";
import Trash from "./components/Trash";
import { Context } from "./components/Context/userContext";

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
                        <Route exact path="/" element={<Home />} />
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
                            path="/profile"
                            element={user ? <Profile /> : <Login />}
                        />
                        <Route
                            path="/sign-up"
                            element={user ? <Home /> : <Signup />}
                        />
                        <Route
                            path="/login"
                            element={user ? <Home /> : <Login />}
                        />
                        <Route path="*" element={user ? <Home /> : <Login />} />
                    </Routes>
                </Router>
            </ThemeProvider>
        </div>
    );
}

export default App;
