import axios from "axios";
import { pathServer } from "../path/pathServer";
import { getAccessToken } from "../service/accessTokenService";
import { getInfo, isAuth } from "../service/checkLogin";

export default async function addMessageToRoomApi({ content, roomName, avatar }) {
    try {
        if (isAuth()) {
            const { _id } = getInfo();
            const data = JSON.stringify({
                query: `mutation {
                  addMessageToRoom(
                      _id: "${_id}",
                      addMessageToRoomDto: {
                          content: "${content}",
                          sender: "${_id}",
                          roomName: "${roomName}",
                          avatar: "${avatar}"
                      }
                  ) {
                      _id, members, messages, roomName, type
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
            if (rs?.data?.data?.addMessageToRoom) {
                return rs?.data?.data?.addMessageToRoom;
            }
        }
        return null;
    } catch (error) {
        console.log(error);
    }
}