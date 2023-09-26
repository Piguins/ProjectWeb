const mongoose = require("mongoose");

async function connect() {
  try {
    mongoose.connect(
      "mongodb+srv://fiat:Thaitai12@cluster0.a2rkte9.mongodb.net/test",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log("connected");
  } catch (error) {
    console.log("failed");
  }
}
module.exports = { connect };