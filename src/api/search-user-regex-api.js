import axios from "axios";
import { isAuth } from "../service/checkLogin";

export const searchUserRegex = async (search) => {
    try {
        if (isAuth()) {
            const data = JSON.stringify({
                query: `query {
                  searchUser(searchUserRegex: "${search}") {
                      _id,
                      username,
                      email,
                      avatar,
                      address,
                      fullname,
                  }
              }`,
                variables: {}
            });
            const config = {
                method: 'post',
                url: `${process.env.REACT_APP_BACKEND_SERVER}/graphql`,
                headers: {
                    'Authorization': `Bearer ${window.localStorage.getItem("access_token")}`,
                    'Content-Type': 'application/json'
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