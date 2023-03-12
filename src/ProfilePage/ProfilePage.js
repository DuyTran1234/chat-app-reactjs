import { Box, Button, Card, TabScrollButton } from "@mui/material";
import { Container } from "@mui/system";
import Image from "mui-image";
import React from "react";
import { findUserByIdApi } from "../api/find-user-by-id-api";
import ChatAppHeader from "../ChatApp/Header/ChatAppHeader";
import { color } from "../color/color";
import { StorageState } from "../context/StorageState";
import { getInfo, isAuth } from "../service/checkLogin";
import ProfileAvatar from "./ProfileAvatar";
import ProfileInfo from "./ProfileInfo";

export default function ProfilePage() {
    const storage = React.useContext(StorageState);

    return <React.Fragment>
        <ChatAppHeader />
        <Container
            maxWidth={"100%"}
            sx={{
                overflow: 'auto',
                backgroundColor: color.profileBackgroundColor,
                height: {
                    lg: "110vh",
                    sm: "100vh",
                    xs: "150vh"
                },
                display: "flex",
                flexDirection: {
                    lg: "row",
                    sm: "column-reverse",
                    xs: "column-reverse",
                },
            }}
            style={{
                padding: 0, margin: 0,
            }}
        >

            <Box
                sx={{
                    display: "flex", flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: 'inherit',
                    height: 'inherit',
                }}
            >
                <ProfileAvatar />
                <ProfileInfo />
            </Box>
        </Container>
    </React.Fragment>
}