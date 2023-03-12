import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import * as React from 'react';
import { color } from '../color/color';
import HeaderMobile from './mobile/HeaderMobile';
import HeaderPc from './pc/HeaderPc';
import HeaderTablet from './tablet/HeaderTablet';

function Header() {
    return (
        <AppBar
            elevation={0}
            position="fixed"
            color="transparent"
        >
            <Container
                maxWidth="100%"
                style={{
                    backgroundColor: color.headerBackgroundColor,
                    height: '80px',
                }}
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    borderBottom: 1,
                    borderColor: color.headerBorderColor,
                }}
            >
                <HeaderMobile />
                <HeaderTablet />
                <HeaderPc />
            </Container>
        </AppBar >
    );
}
export default Header;