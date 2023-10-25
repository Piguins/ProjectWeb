const mongoose = require("mongoose");

const ratingSchema = new mongoose.Schema({

    owner: {
        type: mongoose.Schema.Types.ObjectId, ref: "Users"
    },
  
    value: {
        type: String,
    },
    star:{
        type:Number,
    },
    room: {
        type: mongoose.Schema.Types.ObjectId, ref: "Room"
    },
    host: {
        type: mongoose.Schema.Types.ObjectId, ref: "Users"
    },
    

   
},
{
  timestamps: true
});
const Comment = mongoose.model("Rating", ratingSchema);
module.exports = Comment;
