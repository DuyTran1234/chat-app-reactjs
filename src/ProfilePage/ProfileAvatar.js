import CameraAltIcon from '@mui/icons-material/CameraAlt';
import ClearIcon from '@mui/icons-material/Clear';
import DoneIcon from '@mui/icons-material/Done';
import { Button, Fab } from "@mui/material";
import { Box } from "@mui/system";
import { Buffer } from "buffer";
import Image from "mui-image";
import React from "react";
import { uploadAvatarUserApi } from '../api/upload-avatar-user-api';
import { StorageState } from "../context/StorageState";
import { NotificationContainer, NotificationManager } from "react-notifications";
import 'react-notifications/lib/notifications.css';


export default function ProfileAvatar() {
    const storage = React.useContext(StorageState);
    const { profile, setProfile } = storage;
    const [testAvatar, setTestAvatar] = React.useState(null);
    const [avatarFile, setAvatarFile] = React.useState(null);

    const handleChangeAvatarFile = (e) => {
        const avatarFile = e.target.files[0];
        setAvatarFile(avatarFile);
        const fileReader = new FileReader();
        fileReader.readAsArrayBuffer(avatarFile);
        fileReader.onload = function () {
            const base64String = Buffer.from(fileReader.result).toString('base64');
            setTestAvatar(`data:image/;base64,${base64String}`);
        }
    };
    const handleUploadAvatar = async () => {
        const upload = await uploadAvatarUserApi(avatarFile);
        if (upload?.data) {
            setTestAvatar(null); setAvatarFile(null);
            setProfile(upload.data);
            NotificationManager.success('Update avatar success', '', 1000);
        }
        else {
            NotificationManager.error('Update avatar error', '', 1000);
        }
    }

    return <Box>
        <NotificationContainer />
        <Image
            src={testAvatar ? testAvatar : `${process.env.REACT_APP_PATH_IMAGE_BACKEND}/${profile?.avatar ? profile?.avatar : "default-avatar.png"}`}
            duration={500}
            width="200px" height="200px"
            style={{
                borderRadius: 150,
            }}
        />
        <Fab
            sx={{
                bottom: 50,
                left: 140,
                backgroundColor: '#efeff5',
            }}>
            <Button
                disableRipple={true} disableFocusRipple={true}
                variant="outlined" component="label"
                style={{
                    width: 'inherit',
                    height: 'inherit',
                    borderColor: "rgba(0, 0, 0, 0)",
                    backgroundColor: "rgba(0, 0, 0, 0)",
                    borderRadius: 'inherit',
                }}
            >
                <CameraAltIcon sx={{ color: 'black' }} />
                <input
                    onChange={handleChangeAvatarFile}
                    type="file" hidden accept="image/"
                />
            </Button>
        </Fab>

        {
            testAvatar ? <Fab
                onClick={() => { setTestAvatar(null); setAvatarFile(null); }}
                size='small'
                sx={{
                    bottom: {
                        lg: 50,
                        sm: 50,
                        xs: -5,
                    },
                    left: {
                        lg: 160,
                        sm: 160,
                        xs: -20,
                    },
                    backgroundColor: '#efeff5',
                }}
            >
                <ClearIcon sx={{ color: 'red' }} />
            </Fab> : null
        }
        {
            testAvatar ? <Fab
                onClick={handleUploadAvatar}
                size='small'
                sx={{
                    bottom: {
                        lg: 50,
                        sm: 50,
                        xs: -5,
                    },
                    right: {
                        lg: -180,
                        sm: -180,
                        xs: -20,
                    },
                    backgroundColor: '#efeff5',
                }}
            >
                <DoneIcon sx={{ color: 'green' }} />
            </Fab> : null
        }
    </Box>
}