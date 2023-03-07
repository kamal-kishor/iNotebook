const mongoose = require("mongoose");
// const mongoURI = "mongodb://localhost:27017/";

// Set strictQuery option to false
mongoose.set("strictQuery", false);
const server = "127.0.0.1:27017";
const database = "inotebook";

const connectToMongo = async () => {
  try {
    await mongoose.connect(`mongodb://${server}/${database}`);
    console.log("***** MongoDB Connected *****");
  } catch (err) {
    console.log("Failed to connect to MongoDB", err);
  }
};

module.exports = connectToMongo;
