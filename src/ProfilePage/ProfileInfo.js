import { Button, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { StorageState } from "../context/StorageState";
import ModeEditOutlinedIcon from '@mui/icons-material/ModeEditOutlined';
import { updateUserApi } from "../api/update-user-api";
import { getInfo } from "../service/checkLogin";
import { NotificationContainer, NotificationManager } from "react-notifications";
import 'react-notifications/lib/notifications.css';


export default function ProfileInfo() {
    const storage = React.useContext(StorageState);
    const { profile, setProfile } = storage;
    const [editPassword, setEditPassword] = React.useState("");
    const [editAddress, setEditAddress] = React.useState("");
    const [editFullname, setEditFullname] = React.useState("");

    const handleUpdateUser = async () => {
        const { _id } = getInfo();
        const rs = await updateUserApi(_id, editPassword, editAddress, editFullname);
        if (rs?.data?.data?.updateUser) {
            setProfile(rs?.data?.data?.updateUser);
            setEditPassword(""); setEditAddress(""); setEditFullname("");
            NotificationManager.success('Update user success', '', 1000);
        }
        else {
            NotificationManager.error('Update user error', '', 1000);
        }
    }

    return <Box
        sx={{
            display: 'flex', flexDirection: 'column',
            justifyContent: 'center',
        }}
    >
        <NotificationContainer />
        <Box sx={{ marginX: "15px", width: { lg: "400px", sm: "400px", xs: "75vw" } }}>
            {profile?.fullname ? <Typography sx={{ my: 1, wordWrap: "break-word" }}>{`Full name: ${profile?.fullname}`}</Typography> : null}
            {profile?.username ? <Typography sx={{ my: 1, wordWrap: "break-word" }}>{`Username: ${profile?.username}`}</Typography> : null}
            {profile?.email ? <Typography sx={{ my: 1, wordWrap: "break-word" }}>{`Email: ${profile?.email}`}</Typography> : null}
            {profile?.address ? <Typography sx={{ my: 1, wordWrap: "break-word" }}>{`Address: ${profile?.address}`}</Typography> : null}
        </Box>

        <TextField sx={{ my: 0.5 }}
            value={editPassword}
            onInput={(e) => setEditPassword(e.target.value)}
            label="Edit password" variant="outlined" type="password" />
        <TextField sx={{ my: 0.5 }}
            value={editAddress}
            onInput={(e) => setEditAddress(e.target.value)}
            label="Edit address" variant="outlined" />
        <TextField sx={{ my: 0.5 }}
            value={editFullname}
            onInput={(e) => setEditFullname(e.target.value)}
            label="Edit fullname" variant="outlined" />
        <Button
            sx={{
                my: 2,
            }}
            variant="contained" onClick={handleUpdateUser}
        >
            Update Information
            <ModeEditOutlinedIcon sx={{ ml: 1.5 }} />
        </Button>
    </Box>
}