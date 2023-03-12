import { Avatar, ChatContainer, ConversationHeader, Message, MessageInput, MessageList, TypingIndicator } from "@chatscope/chat-ui-kit-react";
import { useMediaQuery } from "@mui/material";
import { Container } from "@mui/system";
import React from "react";
import addMessageToRoomApi from "../../api/add-message-to-room.api";
import getMessagesRoomApi from "../../api/get-messages-room-api";
import { StorageState } from "../../context/StorageState";
import { getInfo } from "../../service/checkLogin";
import { getRoomName } from "../../service/getRoomName";
import { pathFile } from "../../service/pathFile";
import { socketClient } from "../../socket/socket-client";

export default function ConversionContainer({ appear, setAppear }) {
    const { _id } = getInfo() || { _id: null };
    const matchesPc = useMediaQuery('(min-width:1200px)');
    const storage = React.useContext(StorageState);
    const {
        currentChatMessage,
        profile,
        messageValue, setMessageValue,
        listMessageSocket, setListMessageSocket,
        contactStatus,
    } = storage;
    const [userTyping, setUserTyping] = React.useState([]);

    React.useEffect(() => {
        async function getMessages() {
            const rs = await getMessagesRoomApi(getRoomName([_id, currentChatMessage?._id]));
            if (rs) {
                setListMessageSocket(rs);
            }
        }
        getMessages();
    }, []);
    React.useEffect(() => {
        if (currentChatMessage) {
            const { _id } = getInfo();
            socketClient.emit("startConversationRoom", getRoomName([_id, currentChatMessage?._id]));
        }
    }, [currentChatMessage]);
    React.useEffect(() => {
        socketClient.on("receiveMessage", (receiveMessage) => {
            setListMessageSocket((prev) => [...prev, receiveMessage])
        });
        return () => socketClient.off("receiveMessage");
    });
    React.useEffect(() => {
        socketClient.on("userTyping", (userTypingSocket) => {
            if (userTypingSocket?.active === true) {
                setUserTyping((prevState) => {
                    return prevState.includes(userTypingSocket?.username) ? prevState : [...prevState, userTypingSocket?.username];
                });
            }
            else {
                setUserTyping((prevState) => {
                    const newArr = prevState.filter((item) => item !== userTypingSocket?.username);
                    return newArr;
                });
            }
        });
        return () => socketClient.off("userTyping");
    });

    const handleChangeMessageInput = (val) => {
        setMessageValue(val);
        socketClient.emit("typing", {
            roomId: getRoomName([_id, currentChatMessage?._id]),
            username: profile?.username,
            active: val.length > 0 ? true : false,
        });
    }
    const handleSendMessage = () => {
        const messageModel = {
            message: messageValue,
            sender: _id,
            roomId: getRoomName([_id, currentChatMessage?._id]),
            avatar: profile?.avatar || pathFile.defaultAvatarName,
        };
        const addMessageToRoom = addMessageToRoomApi({
            content: messageValue,
            roomName: getRoomName([_id, currentChatMessage?._id]),
            avatar: profile?.avatar || pathFile.defaultAvatarName,
        });
        socketClient.emit("sendMessage", messageModel);
        socketClient.emit("typing", {
            roomId: getRoomName([_id, currentChatMessage?._id]),
            username: profile?.username,
            active: false,
        });
        setListMessageSocket([...listMessageSocket, messageModel]);
        setMessageValue("");
    }

    return <Container
        maxWidth="100%"
        style={{
            padding: 0, margin: 0,
        }}
        sx={{
            display: (!appear && !matchesPc) ? 'none' : undefined,
            position: (appear && !matchesPc) ? 'fixed' : undefined,
            width: (appear && !matchesPc) ? "100%" : undefined,
            height: (appear && !matchesPc) ? "100%" : undefined,
            zIndex: (appear && !matchesPc) ? 5500 : undefined
        }}
    >
        <ChatContainer>
            <ConversationHeader>
                {
                    !matchesPc ? <ConversationHeader.Back style={{ marginRight: "20px" }} onClick={() => setAppear(false)} /> : null
                }
                <Avatar src={`${pathFile.imageServer}/${currentChatMessage?.avatar}` || pathFile.defaultAvatar}
                    name={`${currentChatMessage?.fullname || 'Anonymous'}`}
                    status={
                        contactStatus?.find((user) => user._id === currentChatMessage?._id).status || "invisible"
                    }
                />
                <ConversationHeader.Content userName={`${currentChatMessage?.username || 'Anonymous'}`} />
            </ConversationHeader>
            <MessageList
                typingIndicator={
                    userTyping.length > 0 ?
                        <TypingIndicator content={`${userTyping?.join(', ')} is typing...`} />
                        : false
                }
            >
                {
                    listMessageSocket?.length > 0 ?
                        listMessageSocket.map((message, index) => {
                            const msgModel = {
                                ...message,
                                direction: message.sender === _id ? "outgoing" : "incoming",
                                avatarSpacer: message.sender === _id ? false : true,
                            };
                            let lstMsg = false;
                            if (message.sender !== _id) {
                                lstMsg = true;
                                msgModel.avatarSpacer = false;
                                if (listMessageSocket[index + 1]?.sender && listMessageSocket[index + 1]?.sender !== _id) {
                                    msgModel.avatarSpacer = true;
                                    lstMsg = false;
                                }
                            }
                            return <Message key={`MessageSocketList${index}`} model={msgModel}
                                avatarSpacer={msgModel.avatarSpacer}
                            // style={{ marginBottom: "10px" }}
                            >
                                {
                                    lstMsg && msgModel.direction === "incoming" ?
                                        <Avatar
                                            size="sm"
                                            style={{ width: "35px", height: "35px" }}
                                            src={`${pathFile.imageServer}/${msgModel?.avatar}` || pathFile.defaultAvatar}
                                        />
                                        : null

                                }
                            </Message>
                        }) : null
                }

            </MessageList>
            <MessageInput attachButton={false} placeholder="Type message here..." value={messageValue}
                onChange={(val) => { handleChangeMessageInput(val) }}
                onSend={() => { handleSendMessage(); }}
            />
        </ChatContainer>
    </Container>
}