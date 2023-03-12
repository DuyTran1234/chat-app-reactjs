import { isAuth } from "../service/checkLogin"
import { pathServer } from "../path/pathServer";
import axios from "axios";

export const getConnectUsersApi = async (_id) => {
    try {
        if (isAuth()) {
            const data = JSON.stringify({
                query: `query {
                  findConnectUsers(
                      _id: "${_id}"
                  ) {
                      _id,
                      username,
                      email,
                      fullname,
                      avatar,
                  }
              }`,
                variables: {}
            });
            var config = {
                method: 'post',
                url: pathServer.serverGraphQL,
                headers: {
                    'Authorization': `Bearer ${window.localStorage.getItem("access_token")}`,
                    'Content-Type': 'application/json'
                },
                data: data
            };
            const rs = await axios(config);
            if (rs?.data?.data?.findConnectUsers) {
                return rs?.data?.data?.findConnectUsers;
            };
        }
        return null;
    } catch (error) {
        console.log(error);
    }
}