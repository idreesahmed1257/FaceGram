const mongoose = require("mongoose");

const post = mongoose.Schema(
  {
    title: { type: String, required: [true, "Title is required"] },
    content: { type: String, required: [true, "Content is required"] },
    userId: { type: mongoose.Types.ObjectId, ref: "User" }
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

post.virtual("user", {
  ref: "User",
  localField: "userId",
  foreignField: "_id"
});

post.virtual("likes", {
  ref: "Like",
  localField: "_id",
  foreignField: "postId"
});

post.virtual("comments", {
  ref: "Comment",
  localField: "_id",
  foreignField: "postId"
});

const Post = mongoose.model("Post", post);

module.exports = Post;
