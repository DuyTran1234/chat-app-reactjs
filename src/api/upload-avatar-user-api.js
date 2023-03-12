import axios from "axios";
import { getInfo, isAuth } from "../service/checkLogin"

export const uploadAvatarUserApi = async (avatarFile) => {
    try {
        if (isAuth()) {
            const { _id } = getInfo();
            var data = new FormData();
            data.append('avatar-file', avatarFile);
            const config = {
                method: 'put',
                url: `${process.env.REACT_APP_BACKEND_SERVER}/user/upload-avatar/${_id}`,
                headers: {
                    'Authorization': `Bearer ${window.localStorage.getItem("access_token")}`,
                    "Content-type": "multipart/form-data",
                },
                data: data
            };
            const rs = await axios(config);
            return rs;
        }
        return null;
    } catch (error) {
        console.log(error);
    }
}