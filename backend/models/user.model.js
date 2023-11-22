const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    userName: { type: "String", required: [true, "Username is required"] },
    email: { type: String, required: [true, "Email is required"] },
    password: { type: String, required: [true, "Password is required"] },
    token: { type: String, required: false },
    userProfile: { type: String, require: false },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);
const User = mongoose.model("User", userSchema);
module.exports = User;
