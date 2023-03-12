import { Box, IconButton, Link, Menu, MenuItem, Typography } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import { useContext } from "react"; 
import { pagesHeader } from "../pagesHeader";
import Image from "mui-image";
import HeaderLogo from "../logo/HeaderLogo";
import {StorageState} from '../../context/StorageState';

const pages = pagesHeader;
export default function HeaderMobile() {
    const { anchorElNav, setAnchorElNav } = useContext(StorageState);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    return <Box sx={{
        display: { xs: 'flex', sm: 'none', lg: 'none' },
        width: 'inherit',
        justifyContent: 'space-between',
    }}>
        <Link
            href='/'
        >
            <HeaderLogo width={"50px"} height={"50px"} />
        </Link>
        <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleOpenNavMenu}
            color="black"
        >
            <MenuIcon />
        </IconButton>
        <Menu
            id="menu-appbar"
            anchorEl={anchorElNav}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
            }}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
            }}
            open={Boolean(anchorElNav)}
            onClose={handleCloseNavMenu}
            sx={{
                display: { xs: 'block', lg: 'none' },
            }}
        >
            {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">{page}</Typography>
                </MenuItem>
            ))}
        </Menu>
    </Box>
}