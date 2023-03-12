import styles from '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import {
    Avatar, Conversation, ConversationList, MainContainer, Search, Sidebar
} from "@chatscope/chat-ui-kit-react";
import { Container, Typography, useMediaQuery } from '@mui/material';
import React from 'react';
import ChatAppHeader from './Header/ChatAppHeader';
import ConversionContainer from './ConversionContainer/ConversationContainer';
import SearchUserContainer from './SearchProfile/SearchUserContainer';
import { searchUserRegex } from "../api/search-user-regex-api";
import SearchProfile from './SearchProfile/SearchProfile';
import { StorageState } from '../context/StorageState';
import ConversionDisable from './ConversionContainer/ConversationDisable';
import ConversionListContainer from "./ConversionContainer/ConversionListContainer";

export default function ChatApp() {
    const storage = React.useContext(StorageState);
    const matchesPc = useMediaQuery('(min-width:1200px)');
    const [searchUser, setSearchUser] = React.useState("");
    const [searchBarUser, setSearchBarUser] = React.useState(false);
    const [resultSearch, setResultSearch] = React.useState([]);
    const { searchProfile,
        contactStatus,
        appearConversationResponsive, setAppearConversationResponsive,
        currentChatMessage, setCurrentChatMessage
    } = storage;

    React.useEffect(() => {
        const userCurrent = contactStatus?.find((user) => user._id === currentChatMessage?._id) || null;
        setCurrentChatMessage(userCurrent)
    }, [contactStatus]);

    const handleSearchUser = async (e) => {
        setSearchUser(e.target.value);
        if (e.target.value.length >= 2) {
            const rs = await searchUserRegex(e.target.value);
            if (rs?.data?.data?.searchUser) {
                setResultSearch(rs?.data?.data?.searchUser);
            }
            setSearchBarUser(true);
        }
        else { setSearchBarUser(false); resultSearch.current = []; }
    }
    return <Container
        maxWidth={"100%"}
        sx={{
            height: "100vh",
            display: "flex",
            flexDirection: {
                lg: "row",
                sm: "column-reverse",
                xs: "column-reverse",
            },
        }}
        style={{
            padding: 0, margin: 0,
        }}
    >
        {searchProfile ? <SearchProfile searchProfile={searchProfile} /> : null}
        <ChatAppHeader />
        {searchBarUser ? <SearchUserContainer resultSearch={resultSearch} /> : null}
        <MainContainer
            style={{
                width: "100%",
                marginLeft: matchesPc ? "60px" : 0,
                marginBottom: !matchesPc ? "60px" : 0,
            }} >
            <Sidebar position={matchesPc ? "left" : null} scrollable={true}
                style={{
                    width: "100%",
                }}
            >
                <Search placeholder="Search username or email..." value={searchUser} onInput={handleSearchUser}
                    onClearClick={() => { setSearchUser(""); setSearchBarUser(false); }}
                    style={{ marginBottom: "10px" }}
                />
                <ConversionListContainer />
            </Sidebar>
            {
                currentChatMessage ?
                    <ConversionContainer appear={appearConversationResponsive} setAppear={setAppearConversationResponsive} />
                    : <ConversionDisable />
            }
        </MainContainer>

    </Container >;
}