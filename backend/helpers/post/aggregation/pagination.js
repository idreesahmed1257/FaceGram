const mongoose = require("mongoose");
const post_skip = (pageNo, pageSize) => {
    return {
        $skip: (pageNo - 1) * pageSize
    }
}

const post_limit = pageSize => {
    return {
        $limit: new mongoose.Types.Decimal128(pageSize)
    }
}

module.exports = {
    post_skip,
    post_limit
};