import axios from "axios";
import { pathServer } from "../path/pathServer";
import { getAccessToken } from "../service/accessTokenService";
import { isAuth } from "../service/checkLogin";

export default async function addConnectUserApi(_id, connectUserId) {
    try {
        if (isAuth()) {
            const data = JSON.stringify({
                query: `mutation {
                  addConnectUser(
                      _id: "${_id}",
                      connectId: "${connectUserId}"
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
            var config = {
                method: 'post',
                url: `${pathServer.serverGraphQL}`,
                headers: {
                    'Authorization': `Bearer ${getAccessToken()}`,
                    'Content-Type': 'application/json'
                },
                data: data
            };
            const rs = await axios(config);
            if (rs?.data?.data?.addConnectUser) {
                return rs?.data?.data?.addConnectUser;
            }
        }
        return null;
    } catch (error) {
        console.log(error);
    }
}