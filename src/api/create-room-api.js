import { getInfo, isAuth } from "../service/checkLogin";
import { getAccessToken } from "../service/accessTokenService";
import { pathServer } from "../path/pathServer";
import axios from "axios";

export default async function createRoomApi(members, type) {
    try {
        if (isAuth()) {
            const { _id } = getInfo();
            const data = JSON.stringify({
                query: `mutation {
                  createRoom(
                      _id: "${_id}",
                      createRoomDto: {
                          type: "${type}",
                          members: ${JSON.stringify(members)},
                      }
                  ) {
                      _id, members, roomName, type, messages
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
            if (rs?.data?.data?.createRoom) {
                return rs?.data?.data?.createRoom;
            }
            else {
                console.log(rs?.data);
            }
        }
        return null;
    } catch (error) {
        console.log(error);
    }
}