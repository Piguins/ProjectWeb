const mongoose = require("mongoose");

// mongoose.plugin(slug);
const { Schema } = mongoose;

const UserDescriptionSchema = new Schema({
    description: {
        type: String,
    
    },
    language: {
        type: String,

    },
    habit: [{
        type: String,
    }]



});
const Description = mongoose.model("Description", UserDescriptionSchema);
module.exports = Description;
