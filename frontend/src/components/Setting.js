// React Components
import { useState, useContext } from "react";

// NPM Components
import axios from "axios";

// Custom Components
import { Context } from "./Context/userContext";

// MUI Components
import {
    styled,
    Dialog,
    TextField,
    Grid,
    Button,
    Typography,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    CircularProgress,
    Avatar,
    Badge,
    Fab,
} from "@mui/material";

// MUI Icons
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";

const AccountButton = styled(Button)`
    border-color: lightgray;
    color: gray;
    &:hover {
        background-color: offwhite;
        border-color: lightgray;
    }
`;

const ProgressButton = styled(CircularProgress)`
    color: gray;
`;
const Input = styled("input")`
    display: none;
`;

const Settings = ({ open, toggleSettings }) => {
    const { user } = useContext(Context);
    const [expanded, setExpanded] = useState(false);
    const [firstname, setFirstname] = useState(user.firstname);
    const [surname, setSurname] = useState(user.surname);
    const [email, setEmail] = useState(user.email);
    const [password, setPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    // Upload profile picture
    const uploadProfilePicture = (e) => {
        e.preventDefault();
        const file = e.target.files[0];
        const data = new FormData();
        const filename = Date.now() + file.name;
        data.append("name", filename);
        data.append("file", file);
        data.append("email", user.email);
        axios.post("http://localhost:8000/upload", data).then((res) => {
            user.profilePicture = res.data;
        });
    };

    // Update user's name
    const updateName = (e) => {
        e.preventDefault();
        setLoading(true);
        const name = { firstname, surname, email: user.email };
        axios
            .post("http://localhost:8000/updateName", name)
            .then((res) => {
                user.firstname = firstname;
                user.surname = surname;
                setLoading(false);
            })
            .catch((err) => {
                alert("Error updating name");
                setLoading(false);
            });
    };

    // Update user's email
    const updateEmail = (e) => {
        e.preventDefault();
        setLoading(true);
        const emails = { email: user.email, newEmail: email };
        axios
            .post("http://localhost:8000/updateEmail", emails)
            .then((res) => {
                user.email = email;
                setLoading(false);
            })
            .catch((err) => {
                alert("Error updating email");
                setLoading(false);
            });
    };

    // Update user's password
    const updatePassword = (e) => {
        e.preventDefault();
        setLoading(true);
        const passwordInfo = { password, newPassword, email: user.email };
        axios
            .post("http://localhost:8000/updatePassword", passwordInfo)
            .then((res) => {
                setLoading(false);
                setExpanded(false);
            })
            .catch((err) => {
                alert("Error updating password");
                setLoading(false);
            });
    };

    return (
        <Dialog open={open} onClose={toggleSettings}>
            <Grid
                container
                spacing={2}
                padding={2}
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    backgroundColor: "#e8eae7",
                }}
            >
                <Grid item>
                    <Typography
                        align="center"
                        variant="h4"
                        fontWeight="regular"
                        pb={5}
                    >
                        Settings
                    </Typography>
                </Grid>
                <Grid item align="center">
                    <Badge
                        overlap="circular"
                        anchorOrigin={{
                            vertical: "bottom",
                            horizontal: "right",
                        }}
                        badgeContent={
                            <label>
                                <Input
                                    accept="image/*"
                                    id="file"
                                    name="file"
                                    type="file"
                                    onChange={uploadProfilePicture}
                                />
                                <Fab
                                    variant="contained"
                                    color="primary"
                                    size="small"
                                    component="span"
                                >
                                    <EditOutlinedIcon />
                                </Fab>
                            </label>
                        }
                    >
                        <Avatar
                            src={user.profilePicture}
                            sx={{
                                width: 150,
                                height: 150,
                            }}
                        />
                    </Badge>
                </Grid>
                <Grid item>
                    <Accordion
                        expanded={expanded === "panel1"}
                        onChange={handleChange("panel1")}
                        elevation={
                            expanded === "panel1" || expanded === false ? 0 : 1
                        }
                        sx={{ backgroundColor: "inherit" }}
                    >
                        {expanded !== "panel1" && (
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1bh-content"
                                id="panel1bh-header"
                            >
                                <Typography
                                    sx={{ width: "33%", flexShrink: 0 }}
                                >
                                    Name
                                </Typography>
                                <Typography sx={{ color: "text.secondary" }}>
                                    {user.firstname + " " + user.surname}
                                </Typography>
                            </AccordionSummary>
                        )}
                        <AccordionDetails>
                            <Grid
                                container
                                spacing={2}
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                }}
                            >
                                <Grid item align="center">
                                    <TextField
                                        label="Firstname"
                                        value={firstname}
                                        onChange={(e) =>
                                            setFirstname(e.target.value)
                                        }
                                        sx={{ marginRight: 1 }}
                                    />
                                    <TextField
                                        label="Surname"
                                        value={surname}
                                        onChange={(e) =>
                                            setSurname(e.target.value)
                                        }
                                        sx={{ marginLeft: 1 }}
                                    />
                                </Grid>
                                <Grid item align="right">
                                    {loading ? (
                                        <ProgressButton />
                                    ) : (
                                        <Button
                                            variant="contained"
                                            onClick={updateName}
                                        >
                                            Update
                                        </Button>
                                    )}
                                    <AccountButton
                                        onClick={() => setExpanded(false)}
                                    >
                                        Cancel
                                    </AccountButton>
                                </Grid>
                            </Grid>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion
                        expanded={expanded === "panel2"}
                        onChange={handleChange("panel2")}
                        elevation={
                            expanded === "panel2" || expanded === false ? 0 : 1
                        }
                        sx={{ backgroundColor: "inherit" }}
                    >
                        {expanded !== "panel2" && (
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel2bh-content"
                                id="panel2bh-header"
                            >
                                <Typography
                                    sx={{ width: "33%", flexShrink: 0 }}
                                >
                                    Email
                                </Typography>
                                <Typography sx={{ color: "text.secondary" }}>
                                    {user.email}
                                </Typography>
                            </AccordionSummary>
                        )}
                        <AccordionDetails>
                            <Grid
                                container
                                spacing={2}
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                }}
                            >
                                <Grid item>
                                    <TextField
                                        label="Email Address"
                                        value={email}
                                        fullWidth
                                        onChange={(e) =>
                                            setEmail(e.target.value)
                                        }
                                        sx={{ marginRight: 1 }}
                                    />
                                </Grid>
                                <Grid item align="right">
                                    {loading ? (
                                        <ProgressButton />
                                    ) : (
                                        <Button
                                            variant="contained"
                                            onClick={updateEmail}
                                        >
                                            Update
                                        </Button>
                                    )}
                                    <AccountButton
                                        onClick={() => setExpanded(false)}
                                    >
                                        Cancel
                                    </AccountButton>
                                </Grid>
                            </Grid>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion
                        expanded={expanded === "panel3"}
                        onChange={handleChange("panel3")}
                        elevation={
                            expanded === "panel3" || expanded === false ? 0 : 1
                        }
                        sx={{ backgroundColor: "inherit" }}
                    >
                        {expanded !== "panel3" && (
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel3bh-content"
                                id="panel3bh-header"
                            >
                                <Typography
                                    sx={{ width: "33%", flexShrink: 0 }}
                                >
                                    Password
                                </Typography>
                                <Typography sx={{ color: "text.secondary" }}>
                                    ********************
                                </Typography>
                            </AccordionSummary>
                        )}
                        <AccordionDetails>
                            <Grid
                                container
                                spacing={2}
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                }}
                            >
                                <Grid item align="center">
                                    <TextField
                                        label="Current Password"
                                        type="password"
                                        value={password}
                                        onChange={(e) =>
                                            setPassword(e.target.value)
                                        }
                                        sx={{ marginRight: 1 }}
                                    />
                                    <TextField
                                        label="New Password"
                                        type="password"
                                        value={newPassword}
                                        onChange={(e) =>
                                            setNewPassword(e.target.value)
                                        }
                                        sx={{ marginLeft: 1 }}
                                    />
                                </Grid>
                                <Grid item align="right">
                                    {loading ? (
                                        <ProgressButton />
                                    ) : (
                                        <Button
                                            variant="contained"
                                            onClick={updatePassword}
                                        >
                                            Update
                                        </Button>
                                    )}
                                    <AccountButton
                                        onClick={() => setExpanded(false)}
                                    >
                                        Cancel
                                    </AccountButton>
                                </Grid>
                            </Grid>
                        </AccordionDetails>
                    </Accordion>
                </Grid>
            </Grid>
        </Dialog>
    );
};

export default Settings;
