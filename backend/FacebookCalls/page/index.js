const axios = require("axios");

const getPageAccessToken = async (userToken, pageId) => {
    try {
        let pageAccessToken = await axios.get(`${process.env.FACEBOOK_API_URL}/${pageId}`, {
            params: {
                client_id: process.env.FACEBOOK_APP_ID,
                fields: "access_token"
            },
            headers: {
                Authorization: `Bearer ${userToken}`
            }
        });
        return pageAccessToken?.data?.access_token;
    } catch (err) {
        return err;
    }
}


const getAllPagePosts = async (pageAccessToken, pageId) => {

    try {
        let allPagePosts = await axios.get(`${process.env.FACEBOOK_API_URL}/${pageId}/posts`, {
            params: {
                // fields: "full_picture,message,likes,insights.metric(post_impressions,post_engaged_users,post_clicks){data,name,values},from{picture,name},created_time,comments{from{picture,name},message,attachment,comments{from{picture,name},message,id}},attachments{media_type,subattachments{media_type,media},media}",
                fields: "full_picture,message,insights.metric(post_impressions,post_engaged_users,post_clicks){data,name,values},from{picture,name},created_time,attachments{media_type,subattachments{media_type,media},media}",
            },
            headers: {
                Authorization: `Bearer ${pageAccessToken}`
            }
        });
        return allPagePosts?.data?.data;
    } catch (err) {
        console.log("Error in getAllPagePosts", err?.response?.data?.error?.message);
        return err;
    }
}

const getAllPageChats = async (pageAccessToken, pageId) => {

    try {
        let allPageChats = await axios.get(`${process.env.FACEBOOK_API_URL}/${pageId}/conversations`, {
            params: {
                fields: "messages{message,from{name},attachments{image_data,video_data,file_url}},message_count, senders",
            },
            headers: {
                Authorization: `Bearer ${pageAccessToken}`
            }
        });
        return allPageChats?.data?.data;
    } catch (err) {
        console.log("Error in getAllchats", err?.response?.data?.error?.message);
        return err;
    }
}

const getNextMessages = async (access_token, pagination) => {
    try {
        // if (!pagination) return null;
        let newChats = await axios.get(pagination, {
            headers: {
                Authorization: `Bearer ${access_token}`
            }
        });
        return newChats?.data
    } catch (err) {
        console.log("Error in newChats", err?.response?.data?.error?.message);
        return err;
    }
}


const sendMessageToClient = async (pageAccessToken, pageId, clientId, message) => {
    try {

        let NewMessage = await axios.post(`${process.env.FACEBOOK_API_URL}/${pageId}/messages`,
            {
                recipient: { id: clientId }, // The recipient should be an object with an "id" property
                message: { text: message },  // The message should be an object with a "text" property
                // tag: "HUMAN_AGENT"
            },
            {
                headers: {
                    Authorization: `Bearer ${pageAccessToken}`
                }
            }
        );
        if (NewMessage?.data?.error) {
            throw err
        }
        console.log("NewMessage", NewMessage?.data);
        return NewMessage?.data;
    } catch (err) {
        console.log("Error in sendMessageToClient", err?.response?.data?.error?.message);
        throw err;
    }
}

const postFbComment = async (objectId, pageAccessToken, comment) => {
    try {

        let newComment = await axios.post(`${process.env.FACEBOOK_API_URL}/${objectId}/comments`,
            {
                message: comment
            },
            {
                headers: {
                    Authorization: `Bearer ${pageAccessToken}`
                }
            }
        );
        if (newComment?.data?.error) {
            throw err
        }
        console.log("NewComment", newComment?.data);
        return newComment?.data;
    } catch (err) {
        console.log("Error in sendMessageToClient", err?.response?.data?.error?.message);
        throw err;
    }
}

const getCommentData = async (commentId, pageAccessToken) => {
    try {

        let commentData = await axios.get(`${process.env.FACEBOOK_API_URL}/${commentId}`,
            {
                params: {
                    fields: "message,from{name,picture{url}}"
                },
                headers: {
                    Authorization: `Bearer ${pageAccessToken}`
                }
            }
        );
        if (commentData?.data?.error) {
            throw err
        }
        return commentData?.data;
    } catch (err) {
        console.log("Error in sendMessageToClient", err?.response?.data?.error?.message);
        throw err;
    }
}
module.exports = {
    getPageAccessToken,
    getAllPagePosts,
    getAllPageChats,
    sendMessageToClient,
    getNextMessages,
    postFbComment,
    getCommentData
};