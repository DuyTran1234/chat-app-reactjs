import { Box, IconButton } from "@mui/material";
import { Container } from "@mui/system";
import { color } from "../../color/color";
import MessageOutlinedIcon from '@mui/icons-material/MessageOutlined';
import ConnectWithoutContactOutlinedIcon from '@mui/icons-material/ConnectWithoutContactOutlined';
import AccountBoxOutlinedIcon from '@mui/icons-material/AccountBoxOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import React from "react";
import { fontSize } from "../../fontSize/fontSize";
import { useNavigate } from "react-router-dom";
import { StorageState } from "../../context/StorageState";
import resetState from "../../service/resetState";
import { getConnectUsersApi } from "../../api/get-connect-users-api";
import { getInfo } from "../../service/checkLogin";
import { findUserByIdApi } from "../../api/find-user-by-id-api";
import { socketClient } from "../../socket/socket-client";
import getListRoomsApi from "../../api/get-list-rooms-api";
import { mapConversationList } from "../../service/mapConversationList";


export default function ChatAppHeader() {
    const storage = React.useContext(StorageState);
    const {
        setContactStatus, setConversationList, contactStatus,
        setProfile, profile,
    } = storage;
    const navigate = useNavigate();
    const handleClickProfile = async () => {
        const { _id } = getInfo();
        const getUser = await findUserByIdApi(_id);
        if (getUser?.data?.data?.findUserById) {
            setProfile(getUser?.data?.data?.findUserById);
        }
        navigate("/profile");
    }
    const handleClickConversion = async () => {
        const conversationListApi = await getListRoomsApi(profile?.connectedRooms);
        if (conversationListApi) {
            const data = await mapConversationList(conversationListApi);
            setConversationList(data);
            socketClient.emit("clientGetUserLogin", contactStatus);
        }
        navigate("/chat-app");
    }
    const handleClickLogout = () => {
        socketClient.emit("logout");
        resetState(storage);
        window.localStorage.removeItem("access_token");
        navigate("/login");
    }
    const handleClickContact = async () => {
        const { _id } = getInfo();
        const getConnectUsers = await getConnectUsersApi(_id);
        if (getConnectUsers) {
            setContactStatus(getConnectUsers);
            if (getConnectUsers.length > 0) { socketClient.emit("clientGetUserLogin", getConnectUsers); }
        }
        navigate("/contact");
    }

    return <Container
        sx={{
            boxShadow: 0,
            opacity: 1,
            zIndex: 5000,
            position: 'fixed',
            bottom: {
                xs: 0,
                sm: 0,
            },
            backgroundColor: color.chatAppHeaderColor,
            width: {
                lg: "60px",
                xs: "100%",
                sm: "100%",
            },
            height: {
                lg: "100%",
                sm: "60px",
                xs: "60px",
            },
            display: 'flex',
            flexDirection: {
                lg: 'column',
                sm: 'row',
                xs: 'row',
            },
            alignItems: "center",
            justifyContent: "space-around"
        }}
        style={{
            margin: 0,
            padding: 0,
        }}
    >
        <Box>
            <IconButton onClick={handleClickConversion}>
                <MessageOutlinedIcon sx={{
                    color: color.chatAppHeaderButtonColor,
                    fontSize: fontSize.chatAppIconHeader,
                }} />
            </IconButton>
        </Box>
        <Box>
            <IconButton onClick={handleClickContact}>
                <ConnectWithoutContactOutlinedIcon sx={{
                    color: color.chatAppHeaderButtonColor,
                    fontSize: fontSize.chatAppIconHeader,
                }} />
            </IconButton>
        </Box>
        <Box>
            <IconButton
                onClick={handleClickProfile}
            >
                <AccountBoxOutlinedIcon sx={{
                    color: color.chatAppHeaderButtonColor,
                    fontSize: fontSize.chatAppIconHeader,
                }} />
            </IconButton>
        </Box>
        <Box>
            <IconButton onClick={handleClickLogout}>
                <LogoutOutlinedIcon sx={{
                    color: color.chatAppHeaderButtonColor,
                    fontSize: fontSize.chatAppIconHeader,
                }} />
            </IconButton>
        </Box>
    </Container>
}