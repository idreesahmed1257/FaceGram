import { getAllPageChatsService, getNextFbChatsService, postCommentService, sendMessageToClientService } from "../../../../services/facebook"
import { ErrorToaster, SuccessToaster } from "../../../Global/MyToaster"

export const getFbPageChats = async (pageId, pageToken, setfbChats) => {
    try {
        let res = await getAllPageChatsService(pageId, pageToken)
        if (res?.code === 200) {
            SuccessToaster(res?.message)
            setfbChats(res?.data?.data)
            console.log("Response of pages", res?.data)
        }
        else {
            ErrorToaster(res.message || "Failed to get the Page");
        }
    }
    catch (err) {
        ErrorToaster(err.message)
    }

}

export const sendMessageToClient = async (pageId, clientId, message, pageToken, fbChats, setfbChats) => {
    try {
        let res = await sendMessageToClientService(pageId, clientId, message, pageToken)
        if (res?.code === 200) {
            SuccessToaster(res?.message)
            console.log("Response of messafe", res?.data)
            fbChatsSetter(fbChats, setfbChats, res?.data?.data, pageId)
        }
        else {
            ErrorToaster(res.message || "Failed to get the Page");
        }
    }
    catch (err) {
        ErrorToaster(err.message)
    }
}

export const createComment = async (pageToken, postComment, setfbPosts) => {
    try {
        let res = await postCommentService(pageToken, postComment?.objectId, postComment?.comment)
        if (res?.code === 200) {
            SuccessToaster(res?.message)
            console.log("Response of comment::", res?.data?.data)
            fbCommentSetter(setfbPosts, res?.data?.data)
        }
        else {
            ErrorToaster(res.message || "Failed to get the Page");
        }
    }
    catch (err) {
        ErrorToaster(err.message)
    }
}

export const fbChatsSetter = (fbChats, setfbChats, notification, pageId) => {
    console.log("fbChats", fbChats)
    console.log("notification", notification)
    setfbChats(oldChats =>
        oldChats?.map(chat => {
            if (chat?.sender?.id === notification?.senderID) {
                console.log("Matched Chat", chat)
                chat?.messages?.push({
                    id: pageId ? pageId : notification?.senderID,
                    text: notification?.messageText,
                    from: 'client',
                    image: notification?.Attachement ? notification?.Attachement[0]?.payload?.url : null,
                })
            }
            else {
                console.log("Not Matched Chat", chat)
            }
            console.log("chat", chat)
            return chat
        })
    )
}

export const fbCommentSetter = (setfbPosts, newComment) => {
    setfbPosts(oldPosts =>
        oldPosts?.map(post => {
            if (post?.id === newComment?.objectId) {
                console.log("Matched Post", post)
                if (!post?.comments) post.comments = []
                post?.comments?.push({
                    id: newComment?.id,
                    message: newComment?.message,
                    from: newComment?.from,
                })
            }
            else {
                // console.log("Not Matched Post", post)
            }
            // console.log("post", post)
            return post
        })
    )
}

export const getNextFbChats = async (pagination, pageToken, senderId, fbChats, setfbChats) => {
    try {
        let res = await getNextFbChatsService(pagination, pageToken)
        if (res?.code === 200) {
            SuccessToaster(res?.message)
            console.log("Response of New chats", res?.data?.data?.newChats)
            setfbChats(oldChats =>
                oldChats?.map(chat => {
                    if (chat?.sender?.id === senderId) {
                        console.log("response:", res?.data?.data?.newChats)
                        const newcat = [...res?.data?.data?.newChats, ...chat?.messages]
                        console.log("Chat messages:", newcat)
                        // chat?.messages?.push(...res?.data?.data?.messages)
                        return {
                            ...chat,
                            messages: newcat,
                            pagination: res?.data?.data?.pagination
                        }
                    }
                    else {
                        return chat
                    }
                })
            )

        }
        else {
            ErrorToaster(res.message || "Failed to get the Page");
        }
    }
    catch (err) {
        ErrorToaster(err.message)
    }
}