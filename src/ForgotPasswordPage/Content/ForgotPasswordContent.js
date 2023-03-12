import { Container } from "@mui/system";
import LoginIntroduce from "../../LoginPage/Content/LoginIntroduce";
import ForgotPasswordInput from "./ForgotPasswordInput";

export default function ForgotPasswordContent() {
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
        <ForgotPasswordInput />
    </Container>
}