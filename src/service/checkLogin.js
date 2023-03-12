import { isExpired, decodeToken } from "react-jwt";


export const isAuth = () => {
    const accessToken = window.localStorage.getItem("access_token");
    if (accessToken) {
        if (!isExpired(accessToken)) { return true; }
        return false;
    }
    return false;
}
export const getInfo = () => {
    const accessToken = window.localStorage.getItem("access_token");
    if (accessToken) {
        if (!isExpired(accessToken)) {
            return decodeToken(accessToken);
        }
    }
    return null;
}