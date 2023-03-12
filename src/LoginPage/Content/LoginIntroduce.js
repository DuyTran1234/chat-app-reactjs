import { Box, Link, Typography } from "@mui/material";
import Image from "mui-image";

export default function LoginIntroduce() {
    return <Box
        sx={{
            width: '100%',
            height: '200px',
            display: 'flex',
            flexDirection: 'column-reverse',
            justifyContent: 'space-evenly',
            alignItems: 'center',
        }}
    >
        <Typography
            variant="h5"
            textAlign={"center"}
            fontSize={"30px"}
        >
            Connect with your favourite people
        </Typography>
        <Link href="/">
            <Image
                src="./images/logo_70x70.gif"
                width={"60px"}
                height={"60px"}
                duration={1000}
            />
        </Link>
    </Box>
}