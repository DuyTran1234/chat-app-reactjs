import axios from "axios";
import { isAuth } from "../service/checkLogin";

export const updateUserApi = async (userId, newPassword, newAddress, newFullname) => {
    try {
        if (isAuth()) {
            const strFullname = newFullname ? `fullname: "${newFullname}",` : "";
            const strPassword = newPassword ? `password: "${newPassword}",` : "";
            const strAddress = newAddress ? `address: "${newAddress}",` : "";
            const data = JSON.stringify({
                query: `mutation {
              updateUser(
                  _id: "${userId}",
                  updateUserDto: {
                    ${strPassword}
                    ${strAddress}
                    ${strFullname}
              }) {
                   _id,
                  username,
                  password,
                  email,
                  fullname,
                  address,
                  avatar,
                  connectedUsers,
                  verifyEmail,
                  connectedRooms,
              }
          }`,
                variables: {}
            });
            var config = {
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