import axios from "axios";
import { getAccessToken } from "../service/accessTokenService";
import { pathServer } from "../path/pathServer";
import { isAuth } from "../service/checkLogin";

export const findUserByIdApi = async (userId) => {
    try {
        if (isAuth()) {
            const accessToken = getAccessToken();
            const data = JSON.stringify({
                query: `query {
              findUserById(_id: "${userId}") {
                  _id,
                  username,
                  password,
                  email,
                  fullname,
                  address,
                  avatar,
                  connectedUsers,
                  connectedRooms,
              }
          }`,
                variables: {}
            });
            const rs = await axios({
                method: 'post',
                url: pathServer.serverGraphQL,
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'application/json'
                },
                data: data,
            });
            return rs;
        }
        return null;
    } catch (error) {
        console.log(error);
    }
}