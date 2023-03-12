import { getInfo, isAuth } from "../service/checkLogin";
import { pathServer } from "../path/pathServer";
import { getAccessToken } from "../service/accessTokenService";
import axios from "axios";

export default async function getListRoomsApi(listRoomId) {
    try {
        if (isAuth()) {
            const { _id } = getInfo();
            const data = JSON.stringify({
                query: `query {
                  getListRooms(
                      _id: "${_id}",
                      listRoomId: ${JSON.stringify(listRoomId)},
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
            if (rs?.data?.data?.getListRooms) {
                return rs?.data?.data?.getListRooms;
            }
        }
        return null;
    } catch (error) {
        console.log(error);
    }
}