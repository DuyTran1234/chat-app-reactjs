import { Button, Typography } from '@mui/material';
import React from 'react';
import deleteConnectUserApi from '../api/delete-connect-user-api';
import { StorageState } from '../context/StorageState';
import { getInfo } from '../service/checkLogin';
import 'react-notifications/lib/notifications.css';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import { socketClient } from '../socket/socket-client';
import { getConnectUsersApi } from '../api/get-connect-users-api';


export default function ButtonDeleteConnectUser({ connectUserId }) {
    const storage = React.useContext(StorageState);
    const {
        setProfile,
        setContactStatus,
    } = storage;

    const handleClickDeleteConnectUser = async () => {
        const { _id } = getInfo();
        const deleteUser = await deleteConnectUserApi(_id, connectUserId);
        const getUsersConnect = await getConnectUsersApi(_id);
        if (deleteUser && getUsersConnect) {
            setProfile(deleteUser);
            if (getUsersConnect) {
                setContactStatus(getUsersConnect.length ? getUsersConnect : []);
                if (getUsersConnect.length > 0) { socketClient.emit("clientGetUserLogin", getUsersConnect); }
            }
            NotificationManager.success("Delete connect user success", '', 1000);
        }
        else { NotificationManager.error("Delete connect user error", '', 1000); }

    }

    return <Button
        onClick={handleClickDeleteConnectUser}
        sx={{
            height: "65px",
            ml: "20px",
        }}
    >
        <NotificationContainer />
        <Typography sx={{ color: 'red', fontSize: "14px" }}>
            Delete
        </Typography>
    </Button>
}