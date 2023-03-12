import { Container } from "@mui/system";
import LoginInput from "./LoginInput";
import LoginIntroduce from "./LoginIntroduce";

export default function LoginContent() {
    return <Container
        maxWidth={"100%"}
        sx={{
            height: '80vh',
        }}
        style={{
            padding: 0,
        }}

    >
        <LoginIntroduce />
        <LoginInput />
    </Container>
}