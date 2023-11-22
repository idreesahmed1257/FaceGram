const user_post_lookup = {
    $lookup: {
        from: "users",
        localField: "userId",
        foreignField: "_id",
        as: "user"
    }
};

const comments_post_lookup = {
    $lookup: {
        from: "comments",
        localField: "_id",
        foreignField: "postId",
        as: "postComments"
    }
};

const user_comments_lookup = {
    $lookup: {
        from: "users",
        localField: "postComments.userId",
        foreignField: "_id",
        as: "commentsUser"
    }
}

const like_post_lookup = {
    $lookup: {
        from: "likes",
        localField: "_id",
        foreignField: "postId",
        as: "postLikes"
    }
}

const user_like_lookup = {
    $lookup: {
        from: "users",
        localField: "postLikes.userId",
        foreignField: "_id",
        as: "likesUser"
    }
}




module.exports = {
    user_post_lookup,
    comments_post_lookup,
    user_comments_lookup,
    like_post_lookup,
    user_like_lookup
};