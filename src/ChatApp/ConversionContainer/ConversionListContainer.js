import styles from '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import {
    Avatar, Conversation, ConversationList
} from "@chatscope/chat-ui-kit-react";
import { pathFile } from '../../service/pathFile';
import React from 'react';
import { StorageState } from '../../context/StorageState';
import { getInfo } from '../../service/checkLogin';
import { getRoomName } from '../../service/getRoomName';
import getMessagesRoomApi from '../../api/get-messages-room-api';

export default function ConversationListContainer() {
    const { _id } = getInfo();
    const storage = React.useContext(StorageState);
    const {
        contactStatus,
        conversationList,
        setCurrentChatMessage,
        setAppearConversationResponsive,
        setListMessageSocket,
    } = storage;

    const handleClickConversation = async (userConversation) => {
        const newUser = {
            ...userConversation,
            status: contactStatus?.find((user) => user._id === userConversation._id).status || "invisible",
        }
        const rs = await getMessagesRoomApi(getRoomName([_id, userConversation?._id]));
        if (rs) {
            setListMessageSocket(rs);
        }
        setCurrentChatMessage(newUser);
        setAppearConversationResponsive(true);
    }

    return <ConversationList>
        {
            Array.isArray(conversationList) ? conversationList?.map((conversation, index) => {
                return <Conversation key={`ConversationListIndex${index}`}
                    onClick={() => { handleClickConversation(conversation?.userConversation) }}
                    name={conversation?.userConversation.username || "anonymous"}
                    lastSenderName={
                        conversation?.lastMessage?.sender === _id ? "You" : conversation?.userConversation.username
                    }
                    info={
                        conversation?.lastMessage?.content || ""
                    }>
                    <Avatar src={`${pathFile.imageServer}/${conversation.userConversation.avatar || pathFile.defaultAvatarName}`}
                        status={
                            contactStatus?.find((user) => user._id === conversation.userConversation._id).status || "invisible"
                        } />
                </Conversation>;
            }) : null
        }
    </ConversationList>
}
