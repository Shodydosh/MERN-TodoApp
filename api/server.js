const express = require("express");
const colors = require("colors");
const dotenv = require("dotenv");
const cors = require("cors");
const morgan = require("morgan");

const app = express();
dotenv.config({ path: "./env" });
app.use(express.json());
app.use(cors());

if (process.env.MODE === "development") {
  app.use(morgan("dev"));
}
const PORT = process.env.PORT || 5000;

const connectDB = require("./config/db");
connectDB();

//! HOSTING
app.listen(PORT, console.log(`Server listening on ${PORT}`.brightYellow.bold));
