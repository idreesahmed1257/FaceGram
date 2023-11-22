import { errorParser } from "../components/Auth/Login/helper";
import { privateAxiosInstance, publicAxiosInstance } from "../utils/http";


export const createPostService = async (postData, user) => {
    let response = {
        code: 400,
        message: "Network Problem"
    };
    try {
        let res = await privateAxiosInstance.post(`createPost`, {
            ...postData,
            userId: user?.myUser?._id,
            userName: user?.myUser?.userName
        });
        console.log("response in service", res);
        if (res) {
            response = {
                code: res?.status,
                message: res?.data?.message,
                data: res?.data
            };
        }
        return response;
    } catch (err) {
        console.log("Error in service", err);
        response = errorParser(err?.response?.data);
        return response;
    }
}
export const updatePostService = async (state, postData) => {
    let response = {
        code: 400,
        message: "Network Problem"
    };
    try {
        let res = await privateAxiosInstance.put(`updatePost`, {
            ...postData,
            postId: state.postId
        });
        console.log("response in service", res);

        if (res) {
            response = {
                code: res?.status,
                message: res?.data?.message,
                data: res?.data
            };
        }
        return response;
    } catch (err) {
        console.log("Error in service", err);
        response = errorParser(err?.response?.data);
        return response;
    }
};

export const getAllPostService = async (postsData, userId) => {
    let response = {
        code: 400,
        message: "Network Problem"
    };
    let obj = {
        pageNo: postsData?.page,
        pageSize: 4
    }
    if (postsData?.search) {
        obj.searchTerm = postsData?.search
    }
    else if (userId) {
        obj.userId = userId
    }
    try {
        let res = await publicAxiosInstance.get(`getAllPosts`, {
            params: obj
        });
        if (res) {
            console.log("Response:", res)
            response = {
                code: res?.status,
                message: res?.data?.message,
                data: res?.data
            };
        }
        return response;
    } catch (err) {
        console.log("Error here:", err)
        response = errorParser(err?.response?.data);
        return response;
    }
};

export const deletePostService = async (postId) => {
    let response = {
        code: 400,
        message: "Network Problem"
    };
    try {
        let res = await privateAxiosInstance.delete(`deletePost`, {
            params: {
                postId: postId
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



