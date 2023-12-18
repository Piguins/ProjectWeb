const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({

    host: {
        type: mongoose.Schema.Types.ObjectId, ref: "Users"
    },
  
    value: {
        type: String,
    },
    cus: {
        type: mongoose.Schema.Types.ObjectId, ref: "Users"
    }
});
const Message = mongoose.model("Message", messageSchema);
module.exports = Message;
