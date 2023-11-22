const fbChatParser = (chats) => {
    let parsedChats = [];
    chats.forEach(chat => {
        let parsedChat = {
            chat_id: chat?.id,
            sender: {
                id: chat?.senders?.data[0]?.id,
                name: chat?.senders?.data[0]?.name,
                message_count: chat?.message_count,
            },
            messages: chat?.messages?.data?.map(message => {
                return {
                    id: message?.from?.id,
                    text: message?.message,
                    from: message?.from?.name,
                    image: message?.attachments?.data[0]?.image_data?.url,
                    video: message?.attachments?.data[0]?.video_data,
                    file: message?.attachments?.data[0]?.file_url,
                }
            }).reverse(),
            pagination: chat?.messages?.paging?.next,
        }
        parsedChats.push(parsedChat);
    });
    return parsedChats;
}

const messageParser = (data) => {
    var obj = {};
    data.entry.forEach((entry) => {
        entry?.messaging?.forEach((event) => {
            if (event?.message?.text) {
                obj = {
                    senderID: event.sender.id,
                    messageText: event.message.text,
                    recipentId: event.recipient.id
                }
            }
            else if (event?.message?.attachments) {
                obj = {
                    senderID: event.sender.id,
                    Attachement: event.message.attachments,
                    recipentId: event.recipient.id
                }
            }
            else {
                obj = {
                    senderID: '123',
                    recipentId: '456',
                    messageText: 'Hello'
                }
            }
        });
    }
    );

    return obj;
}

const newChatParser = (newChats) => {
    let parsedChats = [];
    newChats?.data?.forEach(chat => {
        parsedChats.push({
            id: chat?.from?.id,
            text: chat?.message,
            from: chat?.from?.name,
        })
    });
    return {
        newChats: parsedChats,
        pagination: newChats?.paging?.next
    }
}

module.exports = {
    fbChatParser,
    messageParser,
    newChatParser
}