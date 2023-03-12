import findMessageById from "../api/find-message-by-id-api";
import { findUserByIdApi } from "../api/find-user-by-id-api";
import { getInfo } from "./checkLogin"

export const mapConversationList = async (conversationList) => {
    try {
        if (Array.isArray(conversationList)) {
            const { _id } = getInfo();
            const data = Promise.all(conversationList.map(async (conversation) => {
                const userExcludeId = conversation.members.find((item) => item !== _id);
                const getUser = await findUserByIdApi(userExcludeId);
                const lastMessage = await findMessageById(conversation.messages[conversation.messages.length - 1]);
                console.log(lastMessage);
                if (getUser) {
                    const user = getUser?.data?.data?.findUserById;
                    return { ...conversation, userConversation: user, lastMessage: lastMessage };
                }
                return conversation;
            }));
            return data;
        }
        return null;
    } catch (error) {
        console.log(error);
    }
}