import { Avatar } from "@chatscope/chat-ui-kit-react";
import { Box, Button, Typography } from "@mui/material";
import { Container } from "@mui/system";
import Image from "mui-image";
import React from "react";
import { useNavigate } from "react-router-dom";
import { getConnectUsersApi } from "../api/get-connect-users-api";
import ChatAppHeader from "../ChatApp/Header/ChatAppHeader";
import { color } from "../color/color";
import { StorageState } from "../context/StorageState";
import { getInfo, isAuth } from "../service/checkLogin";
import { pathFile } from "../service/pathFile";
import { socketClient } from "../socket/socket-client";
import ButtonDeleteConnectUser from "./ButtonDeleteConnectUser";

export default function ContactStatusPage() {
    const storage = React.useContext(StorageState);
    const {
        contactStatus, setCurrentChatMessage, setAppearConversationResponsive
    } = storage;
    const navigate = useNavigate();
    const handleClickCurrentChatMessage = (currentUserChat) => {
        setCurrentChatMessage(currentUserChat);
        setAppearConversationResponsive(true);
        navigate('/chat-app');
    }

    return <React.Fragment>
        <ChatAppHeader />
        <Container
            maxWidth="100%"
            style={{ padding: 0 }}
            sx={{
                backgroundColor: color.contactBackgroundColor,
                height: `100vh`,
            }}
        >
            <Box
                sx={{
                    display: 'flex', flexDirection: "column",
                    alignItems: 'center',
                    overflowY: 'auto',
                    width: "100vw",
                    height: "90vh",
                }}>
                <Typography variant="h5" sx={{ my: "20px" }}>
                    {`Friends(${contactStatus?.length})`}
                </Typography>
                {
                    contactStatus?.length > 0 ? contactStatus?.map((user, index) =>
                        <Box key={`contactStatus${index}`}
                            sx={{
                                display: 'flex', flexDirection: 'row', alignItems: 'center',
                            }}
                        >
                            <Button
                                onClick={() => {
                                    handleClickCurrentChatMessage(user);
                                }}
                                sx={{
                                    width: {
                                        lg: "250px", sm: "250px", xs: "180px",
                                    }, my: "15px", boxShadow: 5, borderRadius: 4, height: "65px",
                                    display: 'flex', justifyContent: 'start',
                                }}
                            >
                                <Avatar
                                    src={`${pathFile.imageServer}/${user?.avatar || pathFile.defaultAvatar}`}
                                    name={"Zoe"} style={{ width: "30px", height: "30px", marginRight: "15px" }}
                                    status={user?.status ? user?.status : "invisible"} />
                                <Typography
                                    sx={{
                                        color: 'black',
                                    }}
                                    textTransform={"none"}
                                >
                                    {user?.username}
                                </Typography>
                            </Button>
                            <ButtonDeleteConnectUser connectUserId={user?._id} />
                        </Box>) : null
                }
            </Box>
        </Container>
    </React.Fragment>
}