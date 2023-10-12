const mongoose = require("mongoose");

// mongoose.plugin(slug);
const { Schema } = mongoose;

const collectionSchema = new Schema({
    name: {
        type: String,
        require: true,
        index: true,
        unique: false,
        sparse: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId, ref: "Users"
    },
    room: [{
        type: mongoose.Schema.Types.ObjectId, ref: "Product"
    }],
    display: [{ type: String }]
});
const Collection = mongoose.model("Collection", collectionSchema);
module.exports = Collection;
