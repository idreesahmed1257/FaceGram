import { errorParser } from "../components/Auth/Login/helper";
import { privateAxiosInstance } from "../utils/http";

export const createFacebookUserService = async (userId, faceBookData) => {
    let response = {
        code: 400,
        message: "Network Problem"
    };
    try {
        let res = await privateAxiosInstance.post(`createFacebookUser`, {
            userId: userId,
            faceBookData: faceBookData
        });
        if (res) {
            response = {
                code: res?.status,
                message: res?.data?.message,
                data: res?.data
            };
        }
        return response;
    } catch (err) {
        console.log("Error in service update", err);
        response = errorParser(err?.response?.data);
        return response;
    }
}

export const getFacebookProfileService = async (userId) => {
    let response = {
        code: 400,
        message: "Network Problem"
    };
    try {
        let res = await privateAxiosInstance.get(`getFacebookUser`, {
            params: {
                userId: userId,
            }
        });
        if (res) {
            response = {
                code: res?.status,
                message: res?.data?.message,
                data: res?.data
            };
        }
        return response;
    } catch (err) {
        console.log("Error in service update", err);
        response = errorParser(err?.response?.data);
        return response;
    }
}

export const getAllPagesService = async (userId) => {
    let response = {
        code: 400,
        message: "Network Problem"
    };
    try {
        let res = await privateAxiosInstance.get(`getAllPages`, {
            params: {
                userId: userId,
            }
        });
        if (res) {
            response = {
                code: res?.status,
                message: res?.data?.message,
                data: res?.data
            };
        }
        return response;
    } catch (err) {
        console.log("Error in service update", err);
        response = errorParser(err?.response?.data);
        return response;
    }
}

export const getAllPagePostsService = async (pageId, pageToken) => {
    let response = {
        code: 400,
        message: "Network Problem"
    };
    try {
        let res = await privateAxiosInstance.get(`getFacebookPagePosts`, {
            params: {
                pageId: pageId,
                access_token: pageToken
            }
        });
        if (res) {
            response = {
                code: res?.status,
                message: res?.data?.message,
                data: res?.data
            };
        }
        return response;
    } catch (err) {
        console.log("Error in service update", err);
        response = errorParser(err?.response?.data);
        return response;
    }
}

export const getAllPageChatsService = async (pageId, userToken) => {
    let response = {
        code: 400,
        message: "Network Problem"
    };
    try {
        let res = await privateAxiosInstance.get(`getFacebookPageChats`, {
            params: {
                pageId: pageId,
                access_token: userToken
            }
        });
        if (res) {
            response = {
                code: res?.status,
                message: res?.data?.message,
                data: res?.data
            };
        }
        return response;
    } catch (err) {
        response = errorParser(err?.response?.data);
        return response;
    }
}

export const sendMessageToClientService = async (pageId, clientId, message, userToken) => {
    let response = {
        code: 400,
        message: "Network Problem"
    };
    try {
        let res = await privateAxiosInstance.post(`sendMessagePageToClient`, {
            pageId: pageId,
            clientId: clientId,
            message: message,
            access_token: userToken
        });
        if (res) {
            response = {
                code: res?.status,
                message: res?.data?.message,
                data: res?.data
            };
        }
        return response;
    } catch (err) {
        response = errorParser(err?.response?.data);
        return response;
    }
}

export const postCommentService = async (pageToken, objectId, comment) => {
    let response = {
        code: 400,
        message: "Network Problem"
    };
    try {
        let res = await privateAxiosInstance.post(`postComment`, {
            objectId: objectId,
            comment: comment,
            access_token: pageToken
        });
        if (res) {
            response = {
                code: res?.status,
                message: res?.data?.message,
                data: res?.data
            };
        }
        return response;
    } catch (err) {
        response = errorParser(err?.response?.data);
        return response;
    }
}

export const getNextFbChatsService = async (pagination, pageToken) => {
    let response = {
        code: 400,
        message: "Network Problem"
    };
    try {
        if (!pagination) {
            return {
                code: 400,
                message: "No More Chats Available"
            }
        }
        let res = await privateAxiosInstance.get(`getFacebookPageChats`, {
            params: {
                pagination: pagination,
                access_token: pageToken
            }
        });
        if (res) {
            response = {
                code: res?.status,
                message: res?.data?.message,
                data: res?.data
            };
        }
        return response;
    } catch (err) {
        response = errorParser(err?.response?.data);
        return response;
    }
}