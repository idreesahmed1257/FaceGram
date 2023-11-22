const mongoose = require("mongoose");

const like = mongoose.Schema(
  {
    postId: { type: mongoose.Types.ObjectId, ref: "Post" },
    userId: { type: mongoose.Types.ObjectId, ref: "User" }
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

const Like = mongoose.model("Like", like);

module.exports = Like;
