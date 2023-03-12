import { Container } from "@mui/system"
import { color } from "../../color/color"
import { ContentFooter } from "./ContentFooter"
import SubtitleFooter from "./SubtitleFooter"

export default function Footer() {
    return <Container
        maxWidth="100%"
        style={{
            padding: 0,
            marginTop: "50px",
        }}
        sx={{
            borderTop: 1,
            borderColor: color.footerBorderColor,
            display: 'flex',
            flexDirection: {
                lg: 'row',
                sm: 'column',
                xs: 'column-reverse',
            }
        }}
    >
        <ContentFooter />
        <SubtitleFooter />
    </Container>
}