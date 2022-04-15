// React Components
import { useContext, useState } from "react";
import { NavLink } from "react-router-dom";

// NPM Components
import axios from "axios";

// Custom Components
import { Context } from "./Context/userContext";

// MUI Components
import { Grid, Box, TextField, Button, Typography } from "@mui/material";

// Images
import Ghost from "../assets/images/Ghosts.jpg";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);
    const { setUser } = useContext(Context);

    // Logging In
    const handleSubmit = () => {
        if (email === "" || password === "") setError(true);
        else {
            const userInfo = { email: email.toLowerCase(), password };
            axios
                .post("http://localhost:8080/login", userInfo)
                .then((res) => {
                    // store user info into localstorage
                    setUser(res.data);
                    window.location.href = "/home";
                })
                .catch((err) => {
                    setError(true);
                });
        }
    };

    return (
        <Grid
            container
            sx={{
                height: "100vh",
                width: "100vw",
                overflow: "hidden",
            }}
        >
            <Grid
                item
                xs={12}
                sm={12}
                md={6}
                lg={6}
                sx={{
                    display: "flex",
                    justifyContent: "center",
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        width: "60%",
                        marginTop: "25%",
                    }}
                >
                    <Typography
                        variant="h4"
                        fontWeight="regular"
                        align="center"
                        pb={5}
                    >
                        Login
                    </Typography>
                    <TextField
                        variant="outlined"
                        label="Email"
                        required
                        error={error}
                        onChange={(e) => setEmail(e.target.value)}
                        sx={{ paddingBottom: 3 }}
                    />
                    <TextField
                        variant="outlined"
                        type="password"
                        label="Password"
                        required
                        error={error}
                        onChange={(e) => setPassword(e.target.value)}
                        sx={{ paddingBottom: 5 }}
                    />
                    <Button variant="contained" onClick={handleSubmit}>
                        Login
                    </Button>
                    <Typography pt={3} align="center">
                        Don't have an account? {"  "}
                        <NavLink to="/sign-up">Sign up</NavLink>
                    </Typography>
                </Box>
            </Grid>
            <Grid
                item
                lg={6}
                md={6}
                sm={6}
                sx={{ display: { xs: "none", sm: "none", md: "block" } }}
            >
                <Box
                    mr={-16}
                    sx={{
                        marginRight: "-9rem",
                        overflow: "hidden",
                        position: "relative",
                        height: "100%",
                        transform: "skewX(-10deg)",
                    }}
                >
                    <Box
                        ml={-20}
                        sx={{
                            backgroundImage: `url(${Ghost})`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                            transform: "skewX(10deg)",
                            height: "100%",
                        }}
                    ></Box>
                </Box>
            </Grid>
        </Grid>
    );
};

export default Login;
