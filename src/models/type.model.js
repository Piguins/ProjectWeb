const mongoose = require("mongoose");

// mongoose.plugin(slug);
const { Schema } = mongoose;

const TypeSchema = new Schema({
    name: {
        type: String,
        require: true,
        index: true,
        unique: true,
        sparse: true,
    },
    img: {
        type: String,

    },
    routeName: {
        type: String,
    }



});
const Type = mongoose.model("Type", TypeSchema);
module.exports = Type;
