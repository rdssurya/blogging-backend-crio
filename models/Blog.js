const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
    {
        comment: {
            type: String
        },
    }
);

const blogSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            unique: true,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        comments: {
            type: [commentSchema]
        }
    },
    {
        timestamps: true
    }
);

const Comment = mongoose.model("Comment", commentSchema);
const Blog = mongoose.model("Blog", blogSchema);

module.exports = {Blog, Comment};