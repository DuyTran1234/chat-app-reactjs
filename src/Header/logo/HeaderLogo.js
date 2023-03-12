import Image from "mui-image";
import { pathHeader } from "../../path/pathHeader";


export default function HeaderLogo({height, width}) {
    return <Image
        src={pathHeader.pathLogo}
        height={height}
        width={width}
        duration={1000}
    />
}