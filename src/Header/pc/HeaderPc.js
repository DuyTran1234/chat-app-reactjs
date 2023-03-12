import { Button, Container, Link, Typography } from "@mui/material";
import { Box, fontSize } from "@mui/system";
import Image from "mui-image";
import React from "react";
import { color } from "../../color/color";

import HeaderLogo from "../logo/HeaderLogo";
import { pagesHeader } from "../pagesHeader";

export default function HeaderPc() {
    return <Box sx={{
        display: { xs: 'none', sm: 'none', lg: 'flex' },
        width: 'inherit',
        justifyContent: 'space-between',
    }}>
        <Link
            sx={{
                ml: 1,
            }}
            href='/'
        >
            <HeaderLogo width={"50px"} height={"50px"} />
        </Link>
        <Box
            sx={{
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
                        marginRight: 4,
                        marginLeft: 4,
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