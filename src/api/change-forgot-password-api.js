import axios from "axios";
import { pathServer } from "../path/pathServer";
import { loginApi } from "./login-api";

export const changeForgotPasswordApi = async (username, otpCode, newPassword) => {
    try {
        const data = JSON.stringify({
            query: `mutation {
              forgotPassword(
                  username: "${username}",
                  email: "${username}",
                  otpCodeReceive: "${otpCode}",
                  newPassword: "${newPassword}"
              )
          }`,
            variables: {}
        });
        const rs = await axios({
            method: 'post',
            url: pathServer.serverGraphQL,
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        });
        if (rs?.data?.data?.forgotPassword === true) {
            const login = await loginApi(username, newPassword);
            return login;
        }
        return null;
    } catch (error) {
        console.log(error);
    }
}