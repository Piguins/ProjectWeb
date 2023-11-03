const mongoose = require("mongoose");

// mongoose.plugin(slug);
const { Schema } = mongoose;

const UserSchema = new Schema({
  email: {
    type: String,
    require: true,
    index: true,
    unique: true,
    sparse: true,
  },

  password: String,
  date: { type: Date, default: Date.now },
  age: { type: Number, min: 0, max: 120 },

    description: {
      type: String,

    },
    language: [{
      type: String,

    }],
    habit: [{
      type: String,
    }]

  ,
  address: { type: String },
  avatar: String,
  fullName: String,
  role: String,
  phoneNumber: { type: String },
  autherized: {
    type: Boolean,

  },
  brief: {
    type: String,
  },
  numberOfjudgement: { type: Number }

}, { timestamps: { createdAt: 'created_at' } });
const User = mongoose.model("Users", UserSchema);
module.exports = User;
