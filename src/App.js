import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { findUserByIdApi } from "./api/find-user-by-id-api";
import { getConnectUsersApi } from "./api/get-connect-users-api";
import getListRoomsApi from "./api/get-list-rooms-api";
import ChatApp from "./ChatApp/ChatApp";
import ContactStatusPage from "./ContactStatus/ContactStatusPage";
import { StorageState } from "./context/StorageState";
import ForgotPasswordPage from "./ForgotPasswordPage/ForgotPasswordPage";
import HomePage from "./HomePage/HomePage";
import LoginPage from "./LoginPage/LoginPage";
import ProfilePage from "./ProfilePage/ProfilePage";
import PrivateRoute from "./Router/PrivateRoute";
import { ProtectedRoute } from "./Router/ProtectedRoute";
import { getInfo, isAuth } from "./service/checkLogin";
import { mapConversationList } from "./service/mapConversationList";
import SignUpPage from "./SignUpPage/SignUpPage";
import { socketClient } from "./socket/socket-client";

export default function App() {
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [fullname, setFullname] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [sendOtpCode, setSendOtpCode] = React.useState(false);
    const [loginError, setLoginError] = React.useState(false);
    const [profile, setProfile] = React.useState(null);
    const [searchProfile, setSearchProfile] = React.useState(null);
    const [contactStatus, setContactStatus] = React.useState(null);
    const [currentChatMessage, setCurrentChatMessage] = React.useState(null);
    const [appearConversationResponsive, setAppearConversationResponsive] = React.useState(false);
    const [messageValue, setMessageValue] = React.useState("");
    const [listMessageSocket, setListMessageSocket] = React.useState([]);
    const [conversationList, setConversationList] = React.useState([]);

    const storage = {
        anchorElNav, setAnchorElNav,
        username, setUsername,
        password, setPassword,
        fullname, setFullname,
        email, setEmail,
        loginError, setLoginError,
        sendOtpCode, setSendOtpCode,
        profile, setProfile,
        searchProfile, setSearchProfile,
        contactStatus, setContactStatus,
        appearConversationResponsive, setAppearConversationResponsive,
        currentChatMessage, setCurrentChatMessage,
        messageValue, setMessageValue,
        listMessageSocket, setListMessageSocket,
        conversationList, setConversationList,
    };

    React.useEffect(() => {
        async function fetchFirstRunAppApi() {
            if (isAuth()) {
                const { _id } = getInfo();
                socketClient.emit("login", _id);
                const getUser = await findUserByIdApi(_id);
                const getConnectUsers = await getConnectUsersApi(_id);
                if (getUser?.data?.data?.findUserById && getConnectUsers) {
                    setContactStatus(getConnectUsers);
                    setProfile(getUser?.data?.data?.findUserById);
                    const conversationListApi = await getListRoomsApi(getUser.data.data.findUserById.connectedRooms);
                    if (conversationListApi) {
                        const data = await mapConversationList(conversationListApi);
                        setConversationList(data);
                        socketClient.emit("clientGetUserLogin", getConnectUsers);
                    }
                }
            }
        }
        fetchFirstRunAppApi();
    }, [])

    React.useEffect(() => {
        socketClient.on("listContactStatusOnline", (listUserOnline) => {
            const newList = contactStatus?.map((user) => {
                if (listUserOnline?.includes(user._id)) {
                    return { ...user, status: "available" }
                }
                return { ...user, status: "invisible" };
            });
            if (newList?.length > 0) {
                setContactStatus(newList);
            }
            else { setContactStatus(null) }
        });
        socketClient.on("triggerUserStatus", (isTrigger) => {
            if (isTrigger) {
                socketClient.emit("clientGetUserLogin", contactStatus);
            }
        })

        return () => socketClient.removeAllListeners();
    }, [contactStatus])
    const router = createBrowserRouter([
        {
            path: "/",
            element: <HomePage />
        },
        {
            path: "/home",
            element: <HomePage />
        },
        {
            path: "/login",
            element: <ProtectedRoute>
                <LoginPage />
            </ProtectedRoute>
        },
        {
            path: "/sign-up",
            element: <ProtectedRoute>
                <SignUpPage />
            </ProtectedRoute>
        },
        {
            path: "/chat-app",
            element: <PrivateRoute>
                <ChatApp />
            </PrivateRoute>,
        },
        {
            path: "/forgot-password",
            element: <ProtectedRoute>
                <ForgotPasswordPage />
            </ProtectedRoute>
        },
        {
            path: "/profile",
            element: <PrivateRoute>
                <ProfilePage />
            </PrivateRoute>
        },
        {
            path: "/contact",
            element: <PrivateRoute>
                <ContactStatusPage />
            </PrivateRoute>
        },
    ]);
    return <StorageState.Provider value={storage}>
        <RouterProvider router={router} />
    </StorageState.Provider>;
}