const mongoose = require("mongoose");

const socialSchema = mongoose.Schema(
    {
        social_id: { type: String },
        user_id: { type: String },
        name: { type: String },
        picture_url: { type: String },
        token: { type: String, required: false },
        platform: { type: String },
    },
    { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);
const Social = mongoose.model("Social", socialSchema);
module.exports = Social;
