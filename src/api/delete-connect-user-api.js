import axios from "axios";
import { pathServer } from "../path/pathServer";
import { getAccessToken } from "../service/accessTokenService";
import { isAuth } from "../service/checkLogin";

export default async function deleteConnectUserApi(_id, connectUserId) {
    try {
        if (isAuth()) {
            const data = JSON.stringify({
                query: `mutation {
                  deleteConnectUser(
                      _id: "${_id}",
                      connectUserId: "${connectUserId}"
                  ) {
                      _id,
                      username,
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
            const config = {
                method: 'post',
                url: pathServer.serverGraphQL,
                headers: {
                    'Authorization': `Bearer ${getAccessToken()}`,
                    'Content-Type': 'application/json'
                },
                data: data
            };
            const rs = await axios(config);
            if (rs?.data?.data?.deleteConnectUser) {
                return rs?.data?.data?.deleteConnectUser;
            }
        }
        return null;
    } catch (error) {
        console.log(error);
    }
}