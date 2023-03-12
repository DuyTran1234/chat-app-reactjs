import { Container } from "@mui/system";
import ImageHomePage from "./ImageHomePage";
import IntroduceTitle from "./IntroduceTitle";

export default function Content() {
    return <Container
        maxWidth="100%"
        style={{
            padding: 0,
            marginTop: "85px",
        }}
        sx={{
            display: "flex",
            flexDirection: {
                lg: 'row',
                sm: 'column',
                xs: 'column',
            }
        }}
    >
        <IntroduceTitle />
        <ImageHomePage  />
    </Container>
}