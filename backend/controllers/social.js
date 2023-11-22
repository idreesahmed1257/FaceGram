const { getPageAccessToken, getAllPagePosts, getAllPageChats, sendMessageToClient, getNextMessages, postFbComment, getCommentData } = require("../FacebookCalls/page");
const { getFBPages } = require("../FacebookCalls/user");
const { FACEBOOK_USER_CREATED_SUCCESSFULLY, FACEBOOK_USER_CREATED_FAILURE, USER_NOT_FOUND, USER_FOUND_SUCCESSFULLY, USER_ALREADY_EXIST, USER_NOT_CONNECTED_FB, PLATFORM_FACEBOOK, SOMETHING_WENT_WRONG, SERVER_ERROR, PAGE_POSTS_FOUND_SUCCESSFULLY, PAGE_CHATS_FOUND_SUCCESSFULLY, MESSAGE_SENT_SUCCESSFULLY, NO_MORE_CHATS, COMMENT_POSTED_SUCCESSFULLY } = require("../constants/constants");
const { newChatParser, fbChatParser } = require("../helpers/Facebook/FbChatHelper");
const { fbPostParser } = require("../helpers/Facebook/FbPostHelper");
const { findUser } = require("../libs/auth");
const { createSocialUser, findSocialUser } = require("../libs/social");

const createFacebookUser = req => {
    return new Promise(async (resolve, reject) => {
        try {
            const { userId, faceBookData } = req.body;
            let user = await findUser({ _id: userId });
            if (user) {
                let isDuplicate = await findSocialUser({ user_id: userId, platform: PLATFORM_FACEBOOK });
                if (isDuplicate) {
                    return resolve({
                        code: 409,
                        message: USER_ALREADY_EXIST
                    });
                }
                let socialUser = await createSocialUser(userId, faceBookData, PLATFORM_FACEBOOK)
                if (socialUser) {
                    let pages = await getFBPages(socialUser?.token);
                    return resolve({
                        code: 200,
                        message: FACEBOOK_USER_CREATED_SUCCESSFULLY,
                        data: { user: socialUser, pages: pages }
                    });
                }
                else {
                    return resolve({
                        code: 401,
                        message: FACEBOOK_USER_CREATED_FAILURE
                    });
                }
            }
            else {
                return resolve({
                    code: 401,
                    message: USER_NOT_FOUND
                });
            }
        } catch (err) {
            return resolve({
                code: 500,
                message: SERVER_ERROR
            });
        }
    });
};

const getFacebookUser = req => {
    return new Promise(async (resolve, reject) => {
        try {
            const { userId } = req.query;
            let user = await findSocialUser({ user_id: userId });
            if (user) {
                let pages = await getFBPages(user?.token);
                return resolve({
                    code: 200,
                    message: USER_FOUND_SUCCESSFULLY,
                    data: { user, pages }
                });
            }
            else {
                return resolve({
                    code: 401,
                    message: USER_NOT_CONNECTED_FB
                });
            }
        } catch (err) {
            return resolve({
                code: 500,
                message: SERVER_ERROR
            });
        }
    });
}

//Not using this function
const getAllPages = req => {
    return new Promise(async (resolve, reject) => {
        try {
            const { userId } = req.query;
            let user = await findSocialUser({ user_id: userId });
            let pages = await getFBPages(user?.token);
            if (pages) {
                return resolve({
                    code: 200,
                    message: USER_FOUND_SUCCESSFULLY,
                    data: pages
                });
            }
            else {
                return resolve({
                    code: 401,
                    message: USER_NOT_FOUND
                });
            }
        } catch (err) {
            return resolve({
                code: 500,
                message: SERVER_ERROR
            });
        }
    });
}


const getFacebookPagePosts = req => {
    return new Promise(async (resolve, reject) => {
        try {
            const { pageId, access_token } = req.query;

            let allPosts = await getAllPagePosts(access_token, pageId);
            if (allPosts) {
                return resolve({
                    code: 200,
                    message: PAGE_POSTS_FOUND_SUCCESSFULLY,
                    data: fbPostParser(allPosts)
                });
            }
            else {
                return resolve({
                    code: 401,
                    message: SOMETHING_WENT_WRONG
                });
            }
        }
        catch (err) {
            return resolve({
                code: 500,
                message: SERVER_ERROR
            });
        }
    });
}

const getFacebookPageChats = req => {
    return new Promise(async (resolve, reject) => {
        try {
            const { pageId, access_token, pagination } = req.query;
            if (pageId) {
                let allChats = await getAllPageChats(access_token, pageId);
                if (allChats) {
                    return resolve({
                        code: 200,
                        message: PAGE_CHATS_FOUND_SUCCESSFULLY,
                        data: fbChatParser(allChats)
                    });
                }
            }
            else if (pagination) {
                let newChats = await getNextMessages(access_token, pagination);
                if (newChats) {
                    return resolve({
                        code: 200,
                        message: PAGE_CHATS_FOUND_SUCCESSFULLY,
                        data: newChatParser(newChats)
                    });
                }
            }
            else if (!pagination) {
                resolve({
                    code: 400,
                    message: NO_MORE_CHATS,
                });
            }
            else {
                return resolve({
                    code: 401,
                    message: SOMETHING_WENT_WRONG
                });
            }
        }
        catch (err) {
            console.log("Error in getFacebookPageChats", err);
            return resolve({
                code: 500,
                message: SERVER_ERROR
            });
        }
    });
}
const getNextChats = req => {
    return new Promise(async (resolve, reject) => {
        try {
            const { access_token, pagination } = req.query;
            if (!pagination) return resolve({
                code: 400,
                message: NO_MORE_CHATS,
            });
            let newChats = await getNextMessages(access_token, pagination);
            if (newChats) {
                return resolve({
                    code: 200,
                    message: PAGE_CHATS_FOUND_SUCCESSFULLY,
                    data: newChatParser(newChats)
                });
            }
            else {
                return resolve({
                    code: 401,
                    message: SOMETHING_WENT_WRONG
                });
            }
        }
        catch (err) {
            return resolve({
                code: 500,
                message: SERVER_ERROR
            });
        }
    });
}

const sendMessagePageToClient = req => {
    return new Promise(async (resolve, reject) => {
        try {
            const { pageId, clientId, message, access_token } = req.body;
            let Newmessage = await sendMessageToClient(access_token, pageId, clientId, message);
            if (Newmessage) {
                return resolve({
                    code: 200,
                    message: MESSAGE_SENT_SUCCESSFULLY,
                    data: {
                        senderID: Newmessage?.recipient_id,
                        messageText: message,
                    }
                });
            }
            else {
                return resolve({
                    code: 401,
                    message: SOMETHING_WENT_WRONG
                });
            }
        }
        catch (err) {
            return resolve({
                code: 500,
                message: SERVER_ERROR
            });
        }
    });
}

const postComment = req => {
    return new Promise(async (resolve, reject) => {
        try {
            const { objectId, access_token, comment } = req.body;
            console.log("objectId", objectId);
            let newComment = await postFbComment(objectId, access_token, comment);
            if (newComment) {
                let commentData = await getCommentData(newComment?.id, access_token);
                if (commentData?.error) throw commentData?.error;
                console.log("commentData", commentData);
                return resolve({
                    code: 200,
                    message: COMMENT_POSTED_SUCCESSFULLY,
                    data: {
                        id: commentData?.id,
                        message: commentData?.message,
                        objectId: objectId,
                        from: commentData?.from
                    }
                });
            }
            else {
                return resolve({
                    code: 401,
                    message: SOMETHING_WENT_WRONG
                });
            }
        }
        catch (err) {
            return resolve({
                code: 500,
                message: SERVER_ERROR
            });
        }
    });
}




module.exports = {
    createFacebookUser,
    getFacebookUser,
    getAllPages,
    getFacebookPagePosts,
    getFacebookPageChats,
    sendMessagePageToClient,
    getNextChats,
    postComment
};
