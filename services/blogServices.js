const {Blog, Comment} = require("../models/Blog");

const addBlog = async(blogData) => {
    try {
        const { title } = blogData;
        const isAlreadyExists = await Blog.findOne({title});
        if(isAlreadyExists){
            throw new Error("Blog already exists.");
        }
        const blog = new Blog(blogData);
        await blog.save();
        return blog;
    } catch (error) {
        throw error;
    }
};


const getAllBlogs = async () => {
    try {
        const blogs = await Blog.find();
        return blogs;
    } catch (error) {
        throw error;
    }
}

const getBlog = async (id) => {
    try {
        const blog = await Blog.findOne({_id: id});
        return blog;
    } catch (error) {
        throw error;
    }
}

const deleteBlog = async (blogId) => {
    try {
        const blog = await Blog.findById({ _id: blogId });
        if(blog){
            await Blog.deleteOne({_id: blogId});
            return blog;
        }
        else{
            return null;
        }
    } catch (error) {
        throw new Error("Blog doesn't exist.");
    }
};

const updateBlog = async (blogId, fieldsToUpdate) => {
    try {
        const blog = await Blog.findById({_id: blogId});
        for(let key of Object.keys(fieldsToUpdate)){
            blog[key] = fieldsToUpdate[key];
        }
        await blog.save();
        return blog;
    } catch (error) {
        throw new Error("Blog doesn't exist.");
    }
};

const addCommentToBlog = async (blogId, commentData) => {
    try {
        const blog = await Blog.findById({_id: blogId});
        const comment = await Comment.create({comment: commentData});
        if(blog["comments"]){
            const comments = blog["comments"];
            comments.push(comment);
            blog["comments"] = comments;
        }
        else{
            blog["comments"] = [comment];
        }
        await blog.save();
        return blog;
    } catch (error) {
        throw error;
    }
};

const getAllComments = async (blogId) => {
    try {
        const blog = await Blog.findById({_id: blogId});
        return blog.comments || [];
    } catch (error) {
        throw error;
    }
};


const deleteComment = async (blogId, commentId) => {
    try {
        const blog = await Blog.findById({ _id: blogId });
        if(blog){
            const comments = blog.comments;
            for(const index in comments){
                if(comments[index]._id == commentId){
                    comments.splice(index,1);
                    break;
                }
            }
            blog.comments = comments;
            await blog.save();
            return blog;
        }
        else{
            return null;
        }
    } catch (error) {
        throw error;
    }
};

const updateComment = async (blogId, commentId, fieldsToUpdate) => {
    try {
        const blog = await Blog.findById({ _id: blogId });
        if(blog){
            let comments;
            let index = -1;
            for(let ind in blog.comments){
                if(blog.comments[ind]._id == commentId){
                    comments = blog.comments[ind];
                    index = ind;
                    break;
                }
            }
            if(index == -1){return null;}
            for(let key of Object.keys(fieldsToUpdate)){
                comments[key] = fieldsToUpdate[key];
            }
            blog.comments[index] = comments;
            await blog.save();
            return blog;
        }
        else{
            return null;
        }
    } catch (error) {
        throw error;
    }
};

module.exports = {addBlog, addCommentToBlog, getBlog, getAllBlogs, getAllComments, updateBlog, updateComment, deleteBlog, deleteComment};