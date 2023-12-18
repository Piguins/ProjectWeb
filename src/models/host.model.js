const mongoose = require("mongoose");

// mongoose.plugin(slug);
const { Schema } = mongoose;

const HostSchema = new Schema({
    name: {
        type: String,
        require: true,
        index: true,
        unique: true,
        sparse: true,
    },
    email: { type: String },
    experience: { type: Number },
    evaluate: { type: Number },
    language: [{ type: String }],
    phoneNumber: { type: String },
});
const Host = mongoose.model("Host", HostSchema);
module.exports = Host;
