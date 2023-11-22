import { privateAxiosInstance } from "../../../utils/http";
import { ErrorToaster } from "../../Global/MyToaster";

// export const getPostsById = async (user, postsData, setPostsdata) => {
//     try {
//         let res = await privateAxiosInstance.get(`getAllPosts`, {
//             params: { userId: user?.myUser?._id, pageNo: postsData.page, pageSize: 4 }
//         });

//         setPostsdata(prevState => ({
//             list: [...prevState.list, ...res.data],
//             page: prevState.page + 1
//         }))

//         if (res.data.length === 0) {

//             ErrorToaster("No posts to load")
//         }
//     }
//     catch (err) {
//         ErrorToaster(err?.message)
//     }
// };

export const editPost = async (postId, title, content) => {
    try {
        await privateAxiosInstance.put(`updatePost`, {
            title: title,
            content: content,
            postId: postId
        });
        // getPostsById(user, postsData, setPostsdata, setShowSkelton, setCallApi);
    }
    catch (err) {
        if (err?.response.status === 401) {
            ErrorToaster('Please login to Edit Post')
        }
    }
}
