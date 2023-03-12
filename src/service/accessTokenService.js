
export const getAccessToken = () => {
    return window.localStorage.getItem("access_token");
}
export const setAccessToken = (token) => {
    window.localStorage.setItem("access_token", token);
}