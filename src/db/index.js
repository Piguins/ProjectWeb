const mongoose = require("mongoose");

async function connect() {
  try {
    mongoose.connect(
     process.env.mongooseUrl,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
   
  } catch (error) {
    console.log("failed");
  }
}
module.exports = { connect };
