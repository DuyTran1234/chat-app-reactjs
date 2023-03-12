import axios from "axios"
import { setAccessToken } from "../service/accessTokenService";
import { isAuth } from "../service/checkLogin";

export const loginApi = async (username, password) => {
    try {
        if (!isAuth()) {
            const data = JSON.stringify({
                "username": username,
                "password": password
            });
            const result = await axios({
                method: 'post',
                url: `${process.env.REACT_APP_BACKEND_SERVER}/user/login`,
                headers: {
                    'Content-Type': 'application/json'
                },
                data: data
            });
            if (result?.data?.accessToken) {
                setAccessToken(result?.data?.accessToken);
                return true;
            };
            return null;
        }
        return null;
    } catch (error) {
        console.log(error);
    }
}