import { Container } from "@mui/system";
import LoginIntroduce from "../../LoginPage/Content/LoginIntroduce";
import SignUpInput from "./SignUpInput";

export default function SignUpContent() {
    return <Container
        maxWidth={"100%"}
        sx={{
            height: '100vh',
        }}
        style={{
            padding: 0,
        }}>
        <LoginIntroduce />
        <SignUpInput />
    </Container>
}