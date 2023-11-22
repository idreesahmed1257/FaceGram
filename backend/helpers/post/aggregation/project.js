const post_project = {
  $project: {
    "user._id": 1,
    "user.userName": 1,
    "user.userProfile": 1,
    _id: 1,
    title: 1,
    content: 1,
    userId: 1,
    createdAt: 1,
    comments: 1,
    comments: {
      _id: 1,
      comment: 1,
      createdAt: 1,
      user: {
        _id: 1,
        userName: 1,
        userProfile: 1
      }
    },
    likes: 1,
    likes: {
      _id: 1,
      user: {
        _id: 1,
        userName: 1,
        userProfile: 1
      }
    }
  }
};

module.exports = {
  post_project
};