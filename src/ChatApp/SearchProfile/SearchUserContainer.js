import { Box, Button, Typography } from "@mui/material";
import Image from "mui-image";
import React from "react";
import { StorageState } from "../../context/StorageState";
import SearchProfile from "./SearchProfile";

export default function SearchUserContainer({ resultSearch }) {
    const storage = React.useContext(StorageState);
    const { setSearchProfile } = storage;

    const handleSearchProfile = (profileUser) => {
        setSearchProfile(profileUser);
    }
    return <Box
        sx={{
            display: 'flex',
            flexDirection: 'column',
            width: {
                lg: "300px",
                xs: "100vw",
                sm: "100vw",
            },
            backgroundColor: "white",
            position: 'fixed',
            top: 45,
            left: {
                lg: 70,
            },
            zIndex: 4000,
        }}
    >
        {resultSearch?.map((user, index) => {
            return <Button
                onClick={() => {
                    handleSearchProfile(user);
                }}
                key={`search-user${index}`}
                sx={{
                    justifyContent: 'start',
                }}
            >
                <Image width="40px" height="40px" errorIcon={false} duration={0}
                    style={{
                        borderRadius: 150,
                    }}
                    src={`${process.env.REACT_APP_PATH_IMAGE_BACKEND}/${user?.avatar ? user?.avatar : "default-avatar.png"}`}
                />
                <Typography
                    sx={{
                        ml: "15px",
                        fontSize: "16px",
                        textTransform: 'none',
                    }}
                >
                    {user?.username}
                </Typography>
            </Button>
        })}
    </Box>
}