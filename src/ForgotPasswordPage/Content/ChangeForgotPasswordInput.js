import { Button, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { useNavigate } from "react-router-dom";
import { changeForgotPasswordApi } from "../../api/change-forgot-password-api";
import { StorageState } from "../../context/StorageState";

export default function ChangeForgotPasswordInput() {
    const storage = React.useContext(StorageState)
    const { username, setUsername } = storage;
    const { setSendOtpCode } = storage;
    const [errorChangePassword, setErrorChangePassword] = React.useState(false);
    const [otpCode, setOtpCode] = React.useState("");
    const [newPassword, setNewPassword] = React.useState("");
    const navigate = useNavigate();

    const handleOtpCode = (e) => setOtpCode(e.target.value);
    const handleNewPassword = (e) => setNewPassword(e.target.value);
    const handleClickChangePassword = async () => {
        const rs = await changeForgotPasswordApi(username, otpCode, newPassword);
        if (rs === true) {
            setUsername(""); setSendOtpCode(false); setErrorChangePassword(false); setOtpCode(""); setNewPassword("");
            navigate("/chat-app");
        }
        else {
            setErrorChangePassword(true);
        }
    }
    return <Box
        sx={{
            height: {
                lg: '40vh',
                sm: '25vh',
                xs: '35vh',
            },
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'space-around',
        }}>
        {
            errorChangePassword ? <Typography sx={{
                color: 'red',
                mb: 2,
            }}>
                Change password failed, please try again.
            </Typography> : null
        }
        <TextField label="OTP code" variant="outlined"
            value={otpCode}
            onInput={handleOtpCode}
            sx={{
                width: {
                    lg: "300px",
                    sm: "300px",
                    xs: "240px"
                },
            }}
        />
        <TextField label="New password" variant="outlined"
            type="password"
            onInput={handleNewPassword}
            value={newPassword}
            sx={{
                width: {
                    lg: "300px",
                    sm: "300px",
                    xs: "240px"
                },
            }}
        />
        <Button variant="contained"
            sx={{
                mt: 2,
            }}
            onClick={handleClickChangePassword}
        >
            Change Password
        </Button>
    </Box>
}