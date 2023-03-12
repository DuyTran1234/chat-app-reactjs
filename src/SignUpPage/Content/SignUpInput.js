import { Button, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { redirect } from "react-router-dom";
import { createUserApi } from "../../api/create-user-api";
import { StorageState } from "../../context/StorageState";
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';

export default function SignUpInput() {
    const storage = React.useContext(StorageState);
    const { username, setUsername } = storage;
    const { password, setPassword } = storage;
    const { fullname, setFullname } = storage;
    const { email, setEmail } = storage;
    const { loginError, setLoginError } = storage;

    const handleUsername = (e) => setUsername(e.target.value);
    const handlePassword = (e) => setPassword(e.target.value);
    const handleFullname = (e) => setFullname(e.target.value);
    const handleEmail = (e) => setEmail(e.target.value);
    const handleCreateUser = async () => {
        const rs = await createUserApi({ username, password, fullname, email });
        if (rs?.data?.accessToken) {
            window.localStorage.setItem("access_token", rs.data?.accessToken);
            setUsername(""); setPassword(""); setFullname(""); setEmail(""); setLoginError(false);
            redirect("/chat-app");
        }
        else {
            setLoginError(true);
        }
    };
    return (
        <Box
            sx={{
                height: {
                    lg: '60vh',
                    sm: '45vh',
                    xs: '60vh',
                },
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'space-around',
            }}
        >
            {loginError ? <Typography textAlign="center" sx={{
                color: 'red',
                marginBottom: "10px",
            }}>
                Sign up failed. Please re-enter.
            </Typography> : null}
            <TextField label="Username" variant="outlined" value={username} onChange={handleUsername}
                sx={{
                    width: {
                        lg: "300px",
                        sm: "300px",
                        xs: "240px"
                    },
                }}
            />
            <TextField label="Password" variant="outlined" value={password} onChange={handlePassword}
                type="password"
                sx={{
                    width: {
                        lg: "300px",
                        sm: "300px",
                        xs: "240px"
                    },
                }} />
            <TextField label="Full name" variant="outlined" value={fullname} onChange={handleFullname}
                sx={{
                    width: {
                        lg: "300px",
                        sm: "300px",
                        xs: "240px"
                    },
                }} />
            <TextField label="Email" variant="outlined" value={email} onChange={handleEmail}
                sx={{
                    width: {
                        lg: "300px",
                        sm: "300px",
                        xs: "240px"
                    },
                }} />
            <Button variant="contained" onClick={handleCreateUser} >
                Create
                <CreateOutlinedIcon sx={{ ml: 1 }} fontSize="small" />
            </Button>
        </Box>
    );
}