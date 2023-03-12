import { Button, Link, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { loginApi } from "../../api/login-api";
import { StorageState } from "../../context/StorageState";
import ArrowCircleRightOutlinedIcon from '@mui/icons-material/ArrowCircleRightOutlined';
import { useNavigate } from "react-router-dom";
import { socketClient } from "../../socket/socket-client";
import { findUserByIdApi } from "../../api/find-user-by-id-api";
import { getConnectUsersApi } from "../../api/get-connect-users-api";
import { getInfo } from "../../service/checkLogin";
import { mapConversationList } from "../../service/mapConversationList";
import getListRoomsApi from "../../api/get-list-rooms-api";

export default function LoginInput() {
    const storageState = React.useContext(StorageState);
    const navigate = useNavigate();
    const {
        username, setUsername,
        password, setPassword,
        loginError, setLoginError,
        contactStatus, setContactStatus,
        setProfile,
        conversationList, setConversationList,
    } = storageState;
    const handleInputUsername = (event) => {
        setUsername(event.target.value);
    };
    const handleInputPassword = (event) => {
        setPassword(event.target.value);
    };
    const handleClickButtonLogin = async () => {
        const rs = await loginApi(username, password);
        if (rs) {
            const { _id } = getInfo();
            const getUser = await findUserByIdApi(_id);
            const getConnectUsers = await getConnectUsersApi(_id);
            socketClient.emit("login", _id);
            if (getUser?.data?.data?.findUserById && getConnectUsers) {
                setContactStatus(getConnectUsers);
                setProfile(getUser?.data?.data?.findUserById);
                const conversationListApi = await getListRoomsApi(getUser.data.data.findUserById.connectedRooms);
                if (conversationListApi) {
                    const data = await mapConversationList(conversationListApi);
                    setConversationList(data);
                    socketClient.emit("clientGetUserLogin", getConnectUsers);
                }
            }
            setUsername(""); setPassword(""); setLoginError(false);
            navigate("/chat-app");
        }
        else {
            setUsername(""); setPassword("");
            setLoginError(true);
        }
    }
    return (
        <Box
            sx={{
                height: {
                    lg: '50vh',
                    sm: '40vh',
                    xs: '50vh',
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
                Username and password that you've entered is incorrect.
            </Typography> : null}
            <TextField label="Email address or username" variant="outlined"
                onInput={handleInputUsername}
                value={username || ""}
                sx={{
                    width: {
                        lg: "300px",
                        sm: "300px",
                        xs: "240px"
                    },
                }}
            />
            <TextField label="Password" variant="outlined"
                onInput={handleInputPassword}
                value={password || ""}
                type="password"
                sx={{
                    width: {
                        lg: "300px",
                        sm: "300px",
                        xs: "240px"
                    },
                }} />
            <Button variant="contained" onClick={handleClickButtonLogin}>
                Continue
                <ArrowCircleRightOutlinedIcon sx={{ ml: 1 }} />
            </Button>
            <Link href="/sign-up">Sign Up</Link>
            <Link href="/forgot-password">Forgotten password?</Link>
        </Box>
    );
}