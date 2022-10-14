const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });

    console.log(
      `MongoDB connected: ${conn.connection.host}`.magenta.underline.dim
    );
  } catch (err) {
    console.log(
      `Error connecting to MongoDB: ${err.message}`.red.underline.bold
    );
    process.exit(1);
  }
};

module.exports = connectDB;