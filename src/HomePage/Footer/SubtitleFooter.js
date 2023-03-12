import { Link, Typography } from "@mui/material"
import { Box } from "@mui/system"
import { listSubtitleFooter } from "./listSubtitleFooter"

export default function SubtitleFooter() {
    return <Box
        sx={{
            paddingLeft: '20px',
            width: '100%',
            height: {
                lg: '110px',
                sm: '110px',
                xs: '150px',
            },
            display: 'flex',
            flexDirection: {
                lg: 'row',
                sm: 'row',
                xs: 'column',
            },
            alignItems: {
                lg: 'center',
                sm: 'center',
                xs: 'start',
            },
            justifyContent: 'space-evenly',
        }}
    >
        {
            listSubtitleFooter.map((item, index) => {
                return <Link
                    key={`listFooter: ${item.content} ${index}`}
                    style={{
                        textDecoration: 'none',
                    }}
                    href={`${item.link}`}
                >
                    <Typography
                        sx={{
                            color: 'black',
                            fontSize: '14px',
                        }}
                    >
                        {item.content}
                    </Typography>
                </Link>
            })
        }
    </Box>
}