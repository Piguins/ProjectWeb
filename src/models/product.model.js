const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema({
  name: {
    type: String,

  },
  host: {
    type: mongoose.Schema.Types.ObjectId, ref: "Users"
  },
  startday: {
    type: Date,
    get: value => value.toDateString()
  },
  endday: {
    type: Date,
    get: value => value.toDateString()
  },
  maximuncus: {
    type: Number
  },
  img: [{
    type: String,
  }],
  display: {
    type: String,
  },
  region: {
    type: String,
  },
  price: {
    type: Number,
  },


  type: {
    type: mongoose.Schema.Types.ObjectId, ref: "Type"
  },
  bed: {
    type: Number
  },
  shower: {
    type: Number
  },
  hosthome: {
    type: Boolean
  },
  address: {
    type: String
  },
  isRented:{
    type: Boolean
  },
  validByAdmin: {
    type: Boolean
  },
  Visittime:{
    type:Number
  }
});
const Product = mongoose.model("Room", roomSchema);
module.exports = Product;
