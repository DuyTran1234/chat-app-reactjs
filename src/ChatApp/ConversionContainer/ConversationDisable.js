import { Typography } from "@mui/material";
import { Container } from "@mui/system";
import { color } from "../../color/color";

export default function ConversionDisable() {

    return <Container
        maxWidth="100%"
        style={{
            padding: 0, margin: 0,
        }}
        sx={{
            display: {
                lg: 'flex',
                xs: 'none',
                sm: 'none',
            },
            justifyContent: 'center', alignItems: 'center',
            backgroundColor: color.backgroundColorConversionDisable,
        }}
    >
        <Typography variant="h5">
            Click list conversations or contacts to start a conversation
        </Typography>
    </Container>
}