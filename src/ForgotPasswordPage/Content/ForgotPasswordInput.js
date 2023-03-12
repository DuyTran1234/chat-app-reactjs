import ForwardToInboxOutlinedIcon from '@mui/icons-material/ForwardToInboxOutlined';
import { Button, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { sendEmailOtpCodeApi } from "../../api/send-email-otp-code-api";
import { StorageState } from "../../context/StorageState";
import ChangeForgotPasswordInput from './ChangeForgotPasswordInput';


export default function ForgotPasswordInput() {
    const storage = React.useContext(StorageState)
    const { username, setUsername } = storage;
    const { sendOtpCode, setSendOtpCode } = storage;
    const [errorSendOtp, setErrorSendOtp] = React.useState(false);
    
    const handleUsername = (e) => setUsername(e.target.value);
    const handleSendOtp = async () => {
        const rs = await sendEmailOtpCodeApi(username);
        if (rs?.data?.data?.sendEmailOtpCode === true) {
            setErrorSendOtp(false);
            setSendOtpCode(true);
        }
        else {
            setErrorSendOtp(true);
        }
    }
    return <React.Fragment>
        {
            !sendOtpCode ? <Box
                sx={{
                    height: {
                        lg: '30vh',
                        sm: '20vh',
                        xs: '28vh',
                    },
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'space-around',
                }}>
                {
                    errorSendOtp ? <Typography sx={{
                        color: 'red',
                        mb: 2,
                    }}>
                        Send OTP failed, please try again.
                    </Typography> : null
                }
                <TextField label="Enter email or username registed" variant="outlined"
                    value={username}
                    onInput={handleUsername}
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
                        mt: 5,
                    }}
                    onClick={handleSendOtp}
                >
                    Send OTP
                    <ForwardToInboxOutlinedIcon sx={{ ml: 1 }} />
                </Button>
            </Box>
            : <ChangeForgotPasswordInput />
        }
    </React.Fragment>
}