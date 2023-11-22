const mongoose = require("mongoose");

const commentScheme = mongoose.Schema(
  {
    comment: { type: String, required: [true, "Comment is required"] },
    postId: { type: mongoose.Types.ObjectId, ref: "Post" },
    userId: { type: mongoose.Types.ObjectId, ref: "User" }
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

const Comment = mongoose.model("Comment", commentScheme);

module.exports = Comment;
