const Comment = require('../models/comment.model'); // Assuming the Comment model is in a file called Comment.js

// Create a new comment
async function createComment(content, productId, userId) {
    try {
        const newComment = new Comment({
            content,
            product: productId,
            user: userId
        });
        const savedComment = await newComment.save();
        return savedComment;
    } catch (error) {
        throw error;
    }
}

// Get a comment by ID
async function getCommentById(commentId) {
    try {
        const comment = await Comment.findById(commentId).populate('product').populate('user');
        return comment;
    } catch (error) {
        throw error;
    }
}

// Update a comment by ID
async function updateComment(commentId, update) {
    try {
        const updatedComment = await Comment.findByIdAndUpdate(commentId, update, { new: true });
        return updatedComment;
    } catch (error) {
        throw error;
    }
}

// Delete a comment by ID
async function deleteComment(commentId) {
    try {
        const deletedComment = await Comment.findByIdAndDelete(commentId);
        return deletedComment;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    createComment,
    getCommentById,
    updateComment,
    deleteComment
};