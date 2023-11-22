const Post = require("../../models/post.model");
const postPipeline = require("../../helpers/post/postPipeline");
const Like = require("../../models/like.model");
const Comment = require("../../models/comment.model");
const postCreate = async post => {
  try {
    let res = await Post.create(post);
    return res;
  } catch (err) {
    throw err;
  }
};

// const getAllPostsById = async (userId, pageNo, pageSize) => {
//   try {
//     let resp = await Post.aggregate(
//       postPipeline(null, userId, pageNo, pageSize)
//     );
//     return resp;
//   } catch (err) {
//     throw err;
//   }
// };

const getPosts = async (searchTerm, userId, pageNo, pageSize) => {
  try {
    let resp = await Post.aggregate(
      postPipeline(searchTerm, userId, pageNo, pageSize)
    );
    return resp;
  } catch (err) {
    throw err;
  }
};

const postUpdate = async (postId, title, content) => {
  try {
    let resp = await Post.findByIdAndUpdate(postId, {
      title,
      content
    });
    return resp;
  } catch (err) {
    throw err;
  }
};

const postDelete = async postId => {
  try {
    let resp = await Post.findByIdAndDelete(postId);
    return resp;
  } catch (err) {
    throw err;
  }
};

async function findPost(obj) {
  let post = await Post.find(obj);
  if (post) {
    return true;
  } else {
    return false;
  }
}

async function commentCreate(userId, comment, postId) {
  try {
    let resp = await Comment.create({
      userId,
      comment,
      postId
    });
    return resp;
  } catch (err) {
    throw err;
  }
}

async function likeCreate(userId, postId) {
  try {
    let resp = await Like.create({
      userId,
      postId
    });
    return resp;
  } catch (err) {
    throw err;
  }
}

async function findLike(userId, postId) {
  try {
    let resp = await Like.find({
      userId: userId,
      postId: postId
    });
    return resp[0];
  } catch (err) {
    throw err;
  }
}

async function deleteLike(likeId) {
  try {
    let resp = await Like.findByIdAndDelete(likeId);
    return resp;
  } catch (err) {
    throw err;
  }
}

module.exports = {
  postCreate,
  getPosts,
  postUpdate,
  postDelete,
  findPost,
  commentCreate,
  findLike,
  likeCreate,
  deleteLike
};
