import ClearIcon from '@mui/icons-material/Clear';
import { Box, Fab, Typography } from "@mui/material";
import { Container } from "@mui/system";
import React from 'react';
import { StorageState } from '../../context/StorageState';
import SearchUserProfile from './SearchUserProfile';

export default function SearchProfile({ searchProfile }) {
    const storage = React.useContext(StorageState);
    const { setSearchProfile } = storage;

    return <Container
        style={{
            padding: 0,
        }}
        maxWidth="100%"
        sx={{
            display: 'flex',
            backgroundColor: 'rgba(0,0,0,0.3)',
            height: "100vh",
            position: "fixed",
            zIndex: 4100,
            alignItems: "center",
            justifyContent: "center",
        }}
    >
        <Box
            sx={{
                borderRadius: 5,
                display: 'flex', flexDirection: 'column',
                overflowY: 'auto',
                overflowX: 'hidden',
                width: {
                    lg: "40vw",
                    sm: "60vw",
                    xs: "100vw",
                },
                height: {
                    lg: "90vh",
                    sm: "60vh",
                    xs: "100vh",
                },
                backgroundColor: 'white',
            }}
        >
            <Fab onClick={() => { setSearchProfile(null) }}
                disableFocusRipple={true}
                sx={{
                    backgroundColor: 'rgba(0,0,0,0)',
                    borderColor: 'rgba(0,0,0,0)',
                    boxShadow: 0,
                    left: {
                        xs: "82%",
                        sm: "85.5%",
                        lg: "90%",
                    },
                    top: "5px",
                }}>
                <ClearIcon fontSize="large" />
            </Fab>
            <SearchUserProfile searchProfile={searchProfile} />
        </Box>
    </Container>
}