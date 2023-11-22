const mongoose = require("mongoose");
const { user_post_lookup, comments_post_lookup, user_comments_lookup, like_post_lookup, user_like_lookup } = require("./aggregation/lookup");
const { add_comments_like_user_to_post } = require("./aggregation/addFields");
const { post_project } = require("./aggregation/project");
const { sort_by_date_created } = require("./aggregation/sort");
const { post_skip, post_limit } = require("./aggregation/pagination");
const { match_post_by_title_content_userName, match_post_by_userId } = require("./aggregation/match");

const postPipeline = (searchTerm, userId, pageNo, pageSize) => {
  const pipeline = [
    user_post_lookup,
    comments_post_lookup,
    user_comments_lookup,
    like_post_lookup,
    user_like_lookup,
    add_comments_like_user_to_post,
    post_project,
    sort_by_date_created,
  ];

  if (searchTerm) {
    pipeline.push(match_post_by_title_content_userName(searchTerm));
  }

  if (userId) {
    pipeline.push(match_post_by_userId(userId));
  }

  if (pageNo && pageSize) { //Always True
    pipeline.push(post_skip(pageNo, pageSize));
    pipeline.push(post_limit(pageSize));
  }

  return pipeline;
};

module.exports = postPipeline;
