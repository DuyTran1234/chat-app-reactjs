import { Box } from "@mui/system";
import Image from "mui-image";
import { pathHeader } from "../../path/pathHeader";

export default function ImageHomePage({ height, width }) {
    return <Box
        sx={{
            width: '100%',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
        }}
    >
        <Box
            sx={{
                width: {
                    lg: '80%',
                    sm: '70%',
                    xs: '100%',
                },
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <Image
                src={pathHeader.pathContentImageHomePage}
                height={height}
                width={width}
                duration={0}
            />
        </Box>
    </Box>
}