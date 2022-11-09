const express = require("express");
const bodyParser = require("body-parser");
const colors = require("colors");
const dotenv = require("dotenv");
const cors = require("cors");
const morgan = require("morgan");

// Imports for Routes
const taskRoutes = require("./app/routes/taskRoutes");

// Handle MongoDB connection
const connectDB = require("./database/db");
connectDB();

// Create an Express App
const app = express();
