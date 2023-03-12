import axios from "axios";
import { pathServer } from "../path/pathServer";
import { isAuth } from "../service/checkLogin";
import { loginApi } from "./login-api";

export const createUserApi = async ({ username, password, fullname, email }) => {
    try {
        if (!isAuth()) {
            const query = `mutation {
                createUser(
                    createUserDto: {
                        username: "${username}",
                        password: "${password}",
                        email: "${email}",
                        fullname: "${fullname}",
                    }
                ) {
                    _id,
                    username,
                    password,
                    email,
                    fullname,
                }
            }`;
            const data = JSON.stringify({
                query: query,
                variables: {},
            });
            const createUser = await axios({
                method: 'post',
                url: pathServer.serverGraphQL,
                headers: {
                    'Content-Type': 'application/json'
                },
                data: data
            });
            if (createUser?.data?.data.createUserDto) {
                const login = await loginApi(username, password);
                if (login?.data?.accessToken) {
                    return login;
                }
            }
            return null;
        }
        return null;
    } catch (error) {
        console.log(error);
    }
}