const mongoose = require("mongoose");

// mongoose.plugin(slug);
const { Schema } = mongoose;

const CommentSchema = new Schema({
    content: {
        type: String,


    },
    product: {
        type: mongoose.Schema.Types.ObjectId, ref: "Product"
    },
    user: {
        type: mongoose.Schema.Types.ObjectId, ref: "User"
    }
});
const Comment = mongoose.model("comment", CommentSchema);
module.exports = Comment;
