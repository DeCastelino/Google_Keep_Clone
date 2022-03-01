import { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";

// MUI Components
import { Grid, Box, TextField, Button, Typography } from "@mui/material";

// Images
import Ghost from "../assets/images/Ghosts.jpg";

// Custom Components
import { Context } from "./Context/userContext";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);
    const { user, setUser } = useContext(Context);

    const handleSubmit = () => {
        if (email === "" || password === "") setError(true);
        else {
            const userInfo = { email: email.toLowerCase(), password };
            axios
                .post("http://localhost:8000/login", userInfo)
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
            justifyContent="center"
            sx={{
                margin: 0,
                padding: 0,
                height: "100vh",
                overflow: "hidden",
            }}
        >
            <Grid item xs={12} md={4} lg={6} height="100%" pl="5%">
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
            <Grid item xs={12} md={8} lg={6}>
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
