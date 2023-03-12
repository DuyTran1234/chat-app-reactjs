import axios from "axios";
import { pathServer } from "../path/pathServer";
import { getAccessToken } from "../service/accessTokenService";
import { getInfo, isAuth } from "../service/checkLogin";


export default async function findMessageById(msgId) {
    try {
        if (isAuth()) {
            const { _id } = getInfo();
            const data = JSON.stringify({
                query: `query {
                  findMessageById(
                      _id: "${_id}",
                      messageId: "${msgId}"
                  ) {
                      _id, avatar, content, sender
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
            if (rs?.data?.data?.findMessageById) { return rs?.data?.data?.findMessageById; }
        }
        return null;
    } catch (error) {
        console.log(error);
    }
}