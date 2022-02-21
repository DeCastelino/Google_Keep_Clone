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
    return (
        <div className="App">
            <ThemeProvider theme={theme}>
                <Router>
                    <Routes>
                        <Route exact path="/" element={<Home />} />
                        <Route exact path="/home" element={<Home />} />
                        <Route exact path="/archive" element={<Archive />} />
                        <Route exact path="/trash" element={<Trash />} />
                        <Route exact path="/profile" element={<Profile />} />
                        <Route exact path="/sign-up" element={<Signup />} />
                        <Route exact path="/login" element={<Login />} />
                    </Routes>
                </Router>
            </ThemeProvider>
        </div>
    );
}

export default App;
