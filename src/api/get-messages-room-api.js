import { getInfo, isAuth } from "../service/checkLogin";
import { pathServer } from "../path/pathServer";
import { getAccessToken } from "../service/accessTokenService";
import axios from "axios";
import { findUserByIdApi } from "../api/find-user-by-id-api";

export default async function getMessagesRoomApi(roomName) {
    try {
        if (isAuth()) {
            const { _id } = getInfo();
            const data = JSON.stringify({
                query: `query {
                  getMessagesRoom(
                      _id: "${_id}",
                      roomName: "${roomName}"
                  ) {
                      _id, content, sender, avatar
                  }
              }`,
                variables: {}
            });
            var config = {
                method: 'post',
                url: pathServer.serverGraphQL,
                headers: {
                    'Authorization': `Bearer ${getAccessToken()}`,
                    'Content-Type': 'application/json'
                },
                data: data
            };
            const rs = await axios(config);
            if (rs?.data?.data?.getMessagesRoom) {
                const messages = rs?.data?.data?.getMessagesRoom;
                const data = messages.map((msg) => {
                    return { ...msg, message: msg.content };
                });
                return data;
            }
        }
        return [];
    } catch (error) {
        console.log(error);
    }
}