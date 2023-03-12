import axios from "axios";
import { pathServer } from "../path/pathServer";

export const sendEmailOtpCodeApi = async (userInput) => {
    try {
        const data = JSON.stringify({
            query: `mutation {
              sendEmailOtpCode(
                  sendEmailOtpCodeDto: {
                      username: "${userInput}"
                      email: "${userInput}"
                  }
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
        return rs;
    } catch (error) {
        console.log(error);
    }
}