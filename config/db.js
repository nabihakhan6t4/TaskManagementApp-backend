const mongoose = require("mongoose");
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {});
    console.log("mongodb connected");
  } catch (error) {
    console.log("error connecting to mongodb");
    process.exit(1);
  }
};

module.exports = connectDB;
