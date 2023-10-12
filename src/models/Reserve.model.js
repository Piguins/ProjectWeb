const mongoose = require("mongoose");

const reserveSchema = new mongoose.Schema({

    host: {
        type: mongoose.Schema.Types.ObjectId, ref: "Users"
    },
    room: {
        type: mongoose.Schema.Types.ObjectId, ref: "Product"
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
    }
});
const Reserve = mongoose.model("Reserve", reserveSchema);
module.exports = Reserve;
