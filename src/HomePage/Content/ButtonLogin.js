import { Button } from "@mui/material";

export default function ButtonLogin() {
    return <Button
        href="/login"
        variant="contained"
        sx={{
            height: '45px',
            mx: {
                lg: "15vw",
                sm: "35vw",
                xs: "20vw",
            },
            my: {
                lg: 8,
                sm: 6,
                xs: 5,
            },
            borderRadius: "20px",
        }}
        >
        Sign In
    </Button>;
}