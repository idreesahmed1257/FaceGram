import { deletePostService, getAllPostService } from "../../../services/post";
import { privateAxiosInstance } from "../../../utils/http";
import { ErrorToaster } from "../MyToaster";


export const DEFAULT_POST_DATA = {
  list: [],
  page: 1,
  searchLoader: false,
  search: '',
  loader: false
}

export const DEFAULT_USER_COMMENT = {
  postId: '',
  comment: '',
  loader: false
}

export const DEFAULT_USER_POST_DATA = {
  list: [],
  page: 1,
  search: '',
  loader: true,
}

export const getAllPosts = async (
  postsData,
  setPostsdata,
  userId,
) => {

  try {

    let res = await getAllPostService(postsData, userId);
    console.log("User : Id", userId)
    if (res?.code === 200) {
      console.log("res list", postsData.list)
      setPostsdata(prevState => ({
        ...prevState,
        list: [...postsData?.list, ...res?.data?.data],
        search: postsData?.search,
        page: prevState?.page + 1,
        loader: true,
      }));
      if (res.data.data.length === 0) {
        console.log("No more data", res.data.data)
        setPostsdata({
          ...postsData,
          loader: false
        })
      }
    }
    else {
      ErrorToaster(res?.message || "Post failed");
      setPostsdata({
        ...postsData,
        list: [],
        page: 1,
        loader: false
      })
    }
  } catch (err) {
    ErrorToaster(err?.message);
    setPostsdata({
      ...postsData,
      list: [],
      page: 1,
      loader: false
    })
  }
};



export const updateCommentToPosts = (newComment, setPostsdata, user) => {
  setPostsdata(prevPosts => ({
    ...prevPosts,
    list: prevPosts.list.map(post => {
      if (post._id === newComment.postId) {
        return {
          ...post,
          comments: [
            ...post.comments,
            {
              // _id: newComment._id,
              comment: newComment.comment,
              user: {
                _id: user?.myUser?._id,
                userName: user?.myUser?.userName,
                userProfile: user?.myUser?.userProfile
              }
            }
          ]
        };
      }
      return post;
    })
  })
  );
}


export const createComment = async (auth, postId, userComment, setUserComment, setPostsdata, user) => {
  if (!auth) {
    ErrorToaster("Please login to comment")
    return;
  }
  try {
    setUserComment({
      ...userComment,
      loader: true
    })
    let res = await privateAxiosInstance.post(`createComment`, {
      comment: userComment.comment,
      postId: postId,
      userId: user?.myUser?._id,
      userName: user?.myUser?.userName
    });
    console.log("res", res.data)
    updateCommentToPosts(res.data, setPostsdata, user);
    setUserComment({
      loader: false,
      postId: "",
      comment: ""
    })
  }
  catch (err) {
    ErrorToaster(err.message)
    setUserComment({
      ...userComment,
      loader: true
    })
  }

}


export const updateLikesToPosts = (newLike, setPostsdata, user) => {
  setPostsdata(prevPosts => ({
    ...prevPosts,
    list: prevPosts.list.map(post => {
      if (post._id === newLike.postId) {
        if (post.likes.find(like => like.user?._id === newLike.user?._id)) {
          return {
            ...post,
            likes: post.likes.filter(like => like.user?._id !== newLike.user?._id)
          }
        }
        return {
          ...post,
          likes: [
            ...post.likes,
            {
              postId: newLike.postId,
              user: {
                _id: user?.myUser?._id,
                userName: user?.myUser?.userName,
                userProfile: user?.myUser?.userProfile
              }
            }
          ]
        };
      }
      return post;
    })
  })
  );
}

export const likePost = async (postId, auth, user, setPostsdata) => {
  if (!auth) {
    ErrorToaster("Please login to like")
    return;
  }
  try {
    updateLikesToPosts({
      postId: postId,
      user: {
        _id: user?.myUser?._id,
        userName: user?.myUser?.userName,
        userProfile: user?.myUser?.userProfile
      }
    }, setPostsdata, user)
    let res = await privateAxiosInstance.post(`likePost`, {
      postId: postId,
      userId: user?.myUser?._id
    })
    console.log("res", res.data)
  }
  catch (err) {
    ErrorToaster(err.message)
    updateLikesToPosts({
      postId: postId,
      user: {
        _id: user?.myUser?._id,
        userName: user?.myUser?.userName,
        userProfile: user?.myUser?.userProfile
      }
    }, setPostsdata, user)
  }
}


export const deletePostHelper = async (postId, updateDeletedPost) => {
  try {
    let deletedPost = await deletePostService(postId);
    updateDeletedPost(deletedPost.data)
  }
  catch (err) {
    if (err?.response.status === 401) {
      ErrorToaster('You are not Logged In')
    }
  }
}