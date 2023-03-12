import { Button, Container, Link, Typography } from "@mui/material";
import { Box } from "@mui/system";
import Image from "mui-image";
import React from "react";
import { color } from "../../color/color";
import { fontSize } from "../../fontSize/fontSize";
import HeaderLogo from "../logo/HeaderLogo";
import { pagesHeader } from "../pagesHeader";

export default function HeaderTablet() {
    return <Box sx={{
        display: { xs: 'none', sm: 'flex', lg: 'none' },
        width: 'inherit',
        justifyContent: 'space-between',
    }}>
        <Link
            href='/'
        >
            <HeaderLogo width={"50px"} height={"50px"} />
        </Link>
        <Box
            sx={{
                ml: 2,
                display: { xs: 'none', sm: 'flex' },
                width: 'inherit',
                justifyContent: 'flex-end',
            }}
        >
            {pagesHeader.map((page) => (
                <Button
                    disableRipple
                    key={page}
                    // onClick={}
                    sx={{
                        color: 'white', display: 'block',
                        marginLeft: 5,
                    }}
                >
                    <Link
                        href="/"
                        style={{
                            textDecoration: 'none',
                        }}>
                        <Typography
                            style={{
                                fontWeight: 700,
                                textTransform: 'none',
                                color: color.headerTitleColor,
                                fontSize: fontSize.headerTitle,
                            }}
                        >
                            {page}
                        </Typography>
                    </Link>
                </Button>
            ))}
        </Box>
    </Box>
}