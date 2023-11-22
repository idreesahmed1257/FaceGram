const add_comments_like_user_to_post = {
    $addFields: {
        comments: {
            $map: {
                input: "$postComments",
                as: "comment",
                in: {
                    $mergeObjects: [
                        "$$comment",
                        {
                            user: {
                                $arrayElemAt: [
                                    {
                                        $filter: {
                                            input: "$commentsUser",
                                            as: "u",
                                            cond: {
                                                $eq: ["$$u._id", "$$comment.userId"]
                                            }
                                        }
                                    },
                                    0
                                ]
                            }
                        }
                    ]
                }
            }
        },
        likes: {
            $map: {
                input: "$postLikes",
                as: "like",
                in: {
                    $mergeObjects: [
                        "$$like",
                        {
                            user: {
                                $arrayElemAt: [
                                    {
                                        $filter: {
                                            input: "$likesUser",
                                            as: "l",
                                            cond: {
                                                $eq: ["$$l._id", "$$like.userId"]
                                            }
                                        }
                                    },
                                    0
                                ]
                            }
                        }
                    ]
                }
            }
        },
        user: {
            $arrayElemAt: ["$user", 0]
        }
    }
};

module.exports = {
    add_comments_like_user_to_post
};