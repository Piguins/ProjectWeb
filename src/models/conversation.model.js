const mongoose = require("mongoose");

// mongoose.plugin(slug);
const { Schema } = mongoose;

const ConversatiobSchema = new Schema({

    cusId: {
        type: mongoose.Schema.Types.ObjectId, ref: "User"
    },
    hostId: {
        type: mongoose.Schema.Types.ObjectId, ref: "User"
    },
    messages: [{
        type: mongoose.Schema.Types.ObjectId, ref: "Message"
    }]
});
const Conversation = mongoose.model("Converesation", ConversatiobSchema);
module.exports = Conversation;
