import { NavLink } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

// MUI Components
import { Box, Card, Grid, TextField, Typography, Button } from "@mui/material";

// Images
import StarlitValley from "../assets/images/StarlitValley.png";
const Signup = () => {
    const [firstname, setFirstname] = useState("");
    const [surname, setSurname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);

    const handleSubmit = () => {
        if (
            firstname === "" ||
            surname === "" ||
            email === "" ||
            password === ""
        )
            setError(true);
        else {
            const userInfo = {
                firstname,
                surname,
                email: email.toLowerCase(),
                password,
            };
            axios
                .post("http://localhost:8000/register", userInfo)
                .then((res) => {
                    window.location.href = "/home";
                })
                .catch((err) => {
                    setError(true);
                    alert("Email already exists");
                });
        }
    };

    return (
        <Box sx={{ height: "100vh", overflow: "hidden" }}>
            <Box
                sx={{
                    position: "relative",
                    backgroundImage: `url(${StarlitValley})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    height: "100vh",
                    overflow: "hidden",
                }}
            >
                <Card
                    raised
                    sx={{
                        position: "absolute",
                        marginTop: "10%",
                        marginLeft: "35%",
                        borderRadius: 2,
                        padding: 2,
                    }}
                >
                    <Grid
                        container
                        spacing={2}
                        sx={{
                            dispaly: "flex",
                            flexDirection: "column",
                        }}
                    >
                        <Grid item>
                            <Typography
                                variant="h4"
                                fontWeight="regular"
                                align="center"
                                pb={4}
                            >
                                Register
                            </Typography>
                        </Grid>
                        <Grid item>
                            <TextField
                                variant="outlined"
                                label="Firstname"
                                required
                                error={error}
                                onChange={(e) => setFirstname(e.target.value)}
                                sx={{ paddingRight: 1 }}
                            />
                            <TextField
                                variant="outlined"
                                label="Surname"
                                required
                                error={error}
                                onChange={(e) => setSurname(e.target.value)}
                                sx={{ paddingLeft: 1 }}
                            />
                        </Grid>
                        <Grid item>
                            <TextField
                                variant="outlined"
                                label="Email"
                                type="email"
                                required
                                fullWidth
                                error={error}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </Grid>
                        <Grid item>
                            <TextField
                                variant="outlined"
                                label="Password"
                                type="password"
                                required
                                fullWidth
                                error={error}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </Grid>
                        <Grid item mt={3}>
                            <Button
                                variant="contained"
                                fullWidth
                                onClick={handleSubmit}
                            >
                                Sign Up
                            </Button>
                            <Typography pt={3} align="center">
                                Already have an account? {"  "}
                                <NavLink to="/login">Login</NavLink>
                            </Typography>
                        </Grid>
                    </Grid>
                </Card>
            </Box>
        </Box>
    );
};

export default Signup;
