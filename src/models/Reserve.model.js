const mongoose = require("mongoose");

const reserveSchema = new mongoose.Schema({

    host: {
        type: mongoose.Schema.Types.ObjectId, ref: "Users"
    },
    room: {
        type: mongoose.Schema.Types.ObjectId, ref: "Room"
    },
    start: {
        type: Date,

    },
    end: {
        type: Date,

    },
    day: {
        type: Number
    },
    value: {
        type: String,
    },
    cus: {
        type: mongoose.Schema.Types.ObjectId, ref: "Users"
    },
    created_at: {
        type: Date,
        default: Date.now
    }

});
const Reserve = mongoose.model("Reserve", reserveSchema);
module.exports = Reserve;
