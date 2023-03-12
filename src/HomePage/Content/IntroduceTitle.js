import { Box, Typography } from "@mui/material";
import { color } from "../../color/color";
import ButtonLogin from "./ButtonLogin";

export default function IntroduceTitle() {
    return <Box
        sx={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItem: 'center',

        }}
    >
        <Typography
            variant="h1"
            sx={{
                padding: {
                    xs: 5,
                    lg: 10,
                    sm: 8,
                },
                textAlign: 'center',
                fontSize: {
                    xs: '35px',
                    lg: '65px',
                    sm: '45px',
                },
            }}
            style={{
                fontFamily: 'monospace',
            }}
        >
            Hang out anytime, anywhere
        </Typography>
        <Typography
            sx={{
                color: color.subtitle2IntroduceColor,
                ml: '5px',
                mr: '5px',
                textAlign: 'center',
            }}
        >
            Chat app makes it easy and fun to stay close to your favorite people.
        </Typography>
        <ButtonLogin />
    </Box>
}