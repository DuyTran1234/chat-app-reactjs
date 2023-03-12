import { Typography } from "@mui/material";
import { Box } from "@mui/system";

export function ContentFooter() {
    return <Box
        sx={{
            width: '100%',
            height: '110px',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
        }}
    >
        <Typography
            textAlign="center"
            sx={{
                fontSize: '14px',
            }}
        >
            © Chat app 2023. The Apple and Google Play logos are trademarks of their respective owners.
        </Typography>
    </Box>
}