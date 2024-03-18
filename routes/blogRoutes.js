const express = require("express");
const router = express.Router();
const blogController = require("../controllers/blogController");

router.post("/", blogController.addBlog);

router.get("/", blogController.getAllBlogs);

router.get("/:id", blogController.getBlog);

router.post("/:id/comments", blogController.addCommentToBlog);

router.get("/:id/comments", blogController.getAllComments);

router.put("/:id", blogController.updateBlog);

router.put("/:blogId/comments/:commentId", blogController.updateComment);

router.delete("/:id", blogController.deleteBlog);

router.delete("/:blogId/comments/:commentId", blogController.deleteComment);


module.exports = router;