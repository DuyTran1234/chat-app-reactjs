import { Box, Button, Typography } from "@mui/material";
import { Container } from "@mui/system";
import Image from "mui-image";
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import React from "react";
import { StorageState } from "../../context/StorageState";
import addConnectUserApi from "../../api/add-connect-user-api";
import { getInfo } from "../../service/checkLogin";
import 'react-notifications/lib/notifications.css';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import PersonRemoveOutlinedIcon from '@mui/icons-material/PersonRemoveOutlined';
import deleteConnectUserApi from "../../api/delete-connect-user-api";
import createRoomApi from "../../api/create-room-api";

export default function SearchUserProfile({ searchProfile }) {
    const storage = React.useContext(StorageState);
    const {
        profile,
        setProfile,
    } = storage;
    const [checkConnectUser, setCheckConnectUser] = React.useState(() => {
        return profile.connectedUsers.find((userId) => userId === searchProfile._id);
    });

    const handleClickConnect = async (connectUserId) => {
        const { _id } = getInfo();
        const connectUser = await addConnectUserApi(_id, connectUserId);
        const members = [`${_id}`, `${searchProfile?._id}`];
        const createRoom = await createRoomApi(members, "private");
        if (connectUser) {
            await NotificationManager.success('Connect success', '', 1000);
            setProfile(connectUser);
            setCheckConnectUser(() => connectUser.connectedUsers.find((userId) => userId === searchProfile._id))
        }
        else {
            NotificationManager.error('Connect error', '', 1000);
        }
    }
    const handleRemoveConnect = async (connectUserId) => {
        const { _id } = getInfo();
        const removeConnect = await deleteConnectUserApi(_id, connectUserId);
        if (removeConnect) {
            await NotificationManager.success('Delete connect success', '', 1000);
            setProfile(removeConnect);
            setCheckConnectUser(() => removeConnect.connectedUsers.find((userId) => userId === searchProfile._id));
        }
        else {
            NotificationManager.error('Connect error', '', 1000);
        }
    }

    return <React.Fragment>
        <NotificationContainer />
        <Container
            maxWidth="100%"
            style={{ padding: 0 }}
            sx={{
                display: 'flex', flexDirection: 'column',
                alignItems: 'center',
            }}
        >
            <Image duration={500} width="180px" height="180px" style={{ borderRadius: 150, marginBottom: "50px" }}
                src={`${process.env.REACT_APP_PATH_IMAGE_BACKEND}/${searchProfile?.avatar ? searchProfile?.avatar : "default-avatar.png"}`} />
            {
                !checkConnectUser
                    ? <Button variant="contained"
                        onClick={() => handleClickConnect(searchProfile?._id)}
                    >
                        <SendOutlinedIcon sx={{ fontSize: '18px', mr: '6px' }} />
                        Connect
                    </Button>
                    : <Button variant="contained"
                        onClick={() => handleRemoveConnect(searchProfile?._id)}
                    >
                        <PersonRemoveOutlinedIcon sx={{ fontSize: '18px', mr: '6px' }} />
                        Remove
                    </Button>
            }
            <Box sx={{ margin: "20px", width: { lg: "400px", sm: "70%", xs: "75%" } }}>
                {searchProfile?.fullname ? <Typography sx={{ my: 1, wordWrap: "break-word" }}>{`Full name: ${searchProfile?.fullname}`}</Typography> : null}
                {searchProfile?.username ? <Typography sx={{ my: 1, wordWrap: "break-word" }}>{`Username: ${searchProfile?.username}`}</Typography> : null}
                {searchProfile?.email ? <Typography sx={{ my: 1, wordWrap: "break-word" }}>{`Email: ${searchProfile?.email}`}</Typography> : null}
                {searchProfile?.address ? <Typography sx={{ my: 1, wordWrap: "break-word" }}>{`Address: ${searchProfile?.address}`}</Typography> : null}
            </Box>
        </Container>
    </React.Fragment>
}