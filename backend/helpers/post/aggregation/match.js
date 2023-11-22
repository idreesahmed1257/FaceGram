const mongoose = require("mongoose");
const match_post_by_title_content_userName = searchTerm => {
    return {
        $match: {
            $or: [
                {
                    title: { $regex: searchTerm, $options: "i" }
                },
                {
                    content: { $regex: searchTerm, $options: "i" }
                },
                {
                    "user.userName": { $regex: searchTerm, $options: "i" }
                }
            ]
        }
    }
}

const match_post_by_userId = userId => {
    return {
        $match: {
            userId: new mongoose.Types.ObjectId(userId)
        }
    }
}

module.exports = {
    match_post_by_title_content_userName,
    match_post_by_userId
};