const blogService = require("../services/blogServices");

const addBlog = async (req, res) => {
    try{
        const blogData = req.body;
        const blog = await blogService.addBlog(blogData);
        res.status(201).json({
            message: "Blog added successfully",
            blogId: blog._id
        });
    }
    catch(err){
        res.status(500).json({message: err.message});
    }
};

const getAllBlogs = async (req, res) => {
    try {
        const result = await blogService.getAllBlogs();
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

const getBlog = async (req, res) => {
    try {
        const result = await blogService.getBlog(req.params.id);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};


const deleteBlog = async (req, res) => {
    try {
        const blogId = req.params.id;
        const blog = await blogService.deleteBlog(blogId);
        if(blog){
            res.status(204).json({message:"Blog deleted successfully"});
        }
        else{
            throw new Error("Blog doesn't exist.");
        }
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

const updateBlog = async (req, res) => {
    try {
        if(!req.body){
            throw new Error("Provide details to update.");
        }
        const fieldsToUpdate = req.body;
        const blogId = req.params.id;
        const blog = await blogService.updateBlog(blogId, fieldsToUpdate);
        res.status(200).json(blog);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

const addCommentToBlog = async (req, res) => {
    try {
        const blogId = req.params.id;
        const comment = req.body.comment;
        const blog = await blogService.addCommentToBlog(blogId, comment);
        res.status(201).json({
            message: "Comment added successfully",
            blog: blog
        });
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

const getAllComments = async (req, res) => {
    try {
        const blogId = req.params.id;
        const comments = await blogService.getAllComments(blogId);
        res.status(200).json(comments);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};


const deleteComment = async (req, res) => {
    try {
        const blogId = req.params.blogId;
        const commentId = req.params.commentId;
        const blog = await blogService.deleteComment(blogId, commentId);
        if(blog){
            res.status(204).json({message:"Comment deleted successfully"});
        }
        else{
            throw new Error("Blog or Comment doesn't exist.");
        }
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

const updateComment = async (req, res) => {
    try {
        const blogId = req.params.blogId;
        const commentId = req.params.commentId;
        const fieldsToUpdate = req.body;
        const blog = await blogService.updateComment(blogId, commentId, fieldsToUpdate);
        if(blog){
            res.status(200).json(blog);
        }
        else{
            throw new Error("Blog or Comment doesn't exist.");
        }
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

module.exports = {getAllBlogs, getAllComments, getBlog, addBlog, addCommentToBlog, deleteBlog, deleteComment, updateBlog, updateComment};