const Post = require("../models/post.model");
const User = require("../models/user.model");
const { findUser } = require("../libs/auth");
const {
  postCreate,
  postUpdate,
  postDelete,
  commentCreate,
  likeCreate,
  findLike,
  deleteLike,
  findPost,
  getPosts
} = require("../libs/post");
const Comment = require("../models/comment.model");
const Like = require("../models/like.model");
const {
  USER_NOT_FOUND,
  SERVER_ERROR,
  POST_CREATED_SUCCESS,
  POST_LOADED_SUCCESS,
  POST_UPDATED_SUCCESS
} = require("../constants/constants");

async function createPost(req) {
  return new Promise(async (resolve, reject) => {
    try {
      let post = req.body;
      let UserExist = await findUser({ _id: post.userId });
      if (!UserExist) {
        return resolve({
          code: 401,
          message: USER_NOT_FOUND
        });
      }
      let res = await postCreate({
        title: post.title,
        content: post.content,
        userId: post.userId,
        userName: post.userName
      });
      console.log("response: ", res);
      if (res) {
        return resolve({
          code: 200,
          message: POST_CREATED_SUCCESS,
          data: res
        });
      } else {
        return resolve({
          code: 500,
          message: SERVER_ERROR
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

// async function getPostById(req) {
//   try {
//     const { userId, pageNo, pageSize } = req.query;
//     let resp = await getAllPostsById(userId, pageNo, pageSize);
//     return resp;
//   } catch (err) {
//     throw err;
//   }
// }

// async function getPostById(id) {
//   try {
//     let res = await Post.find({ userId: id })
//       .populate({
//         path: "comments",
//         select: "userId comment",
//         populate: {
//           path: "userId",
//           select: "userName"
//         }
//       })
//       .populate({
//         path: "likes",
//         select: "userId",
//         populate: {
//           path: "userId",
//           select: "userName"
//         }
//       })
//       .populate({
//         path: "user",
//         select: "userName"
//       })
//       .sort({ createdAt: -1 });
//     return res;
//   } catch (err) {
//     throw err;
//   }
// }

async function getAllPosts(req) {
  return new Promise(async (resolve, reject) => {
    try {
      const { searchTerm, userId, pageNo, pageSize } = req.query;

      let res = await getPosts(searchTerm, userId, pageNo, pageSize);
      if (res) {
        return resolve({
          code: 200,
          message: POST_LOADED_SUCCESS,
          data: res
        });
      } else {
        return resolve({
          code: 500,
          message: SERVER_ERROR
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

// Get All Posts with Populates
// async function getAllPosts() {
//   try {
//     let posts = await Post.find()
//       .populate({
//         path: "comments",
//         select: "userId comment",
//         populate: {
//           path: "userId",
//           select: "userName"
//         }
//       })
//       .populate({
//         path: "likes",
//         select: "userId",
//         populate: {
//           path: "userId",
//           select: "userName"
//         }
//       })
//       .populate({
//         path: "user",
//         select: "userName"
//       })
//       .sort({ createdAt: -1 });

//     return posts;

//     // let posts = await Post.find({}).sort({ createdAt: -1 });
//     // return posts;
//   } catch (err) {
//     throw err;
//   }
// }

async function updatePost(req) {
  return new Promise(async (resolve, reject) => {
    try {
      const { postId, title, content } = req.body;
      let updatedPost = await postUpdate(postId, title, content);
      if (!updatedPost) {
        return resolve({
          code: 500,
          message: SERVER_ERROR
        });
      } else {
        return resolve({
          code: 200,
          message: POST_UPDATED_SUCCESS,
          data: updatedPost
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

async function deletePost(req) {
  try {
    let res = await postDelete(req.query.postId);
    return res;
  } catch (err) {
    throw err;
  }
}

//Comments

async function createComment(req) {
  try {
    const { userId, comment, postId } = req.body;
    let UserExist = await findUser({ _id: userId });
    if (!UserExist) {
      return "User does not exist";
    }
    let PostExist = await findPost({ _id: postId });
    if (!PostExist) {
      return "Post does not exist";
    }
    let res = await commentCreate(userId, comment, postId);
    return res;
  } catch (err) {
    throw err;
  }
}

async function likePost(req) {
  try {
    const { userId, postId } = req.body;
    let UserExist = await findUser({ _id: userId });
    if (!UserExist) {
      return "User does not exist";
    }
    let PostExist = await findPost({ _id: postId });
    if (!PostExist) {
      return "Post does not exist";
    }
    const likedPost = await findLike(userId, postId);
    if (likedPost) {
      const res = await deleteLike(likedPost._id);
      return res;
    } else {
      const res = await likeCreate(userId, postId);
      return res;
    }
  } catch (err) {
    throw err;
  }
}

module.exports = {
  getAllPosts,
  createPost,
  updatePost,
  deletePost,
  createComment,
  likePost
};
