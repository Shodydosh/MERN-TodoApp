const express = require("express");
const colors = require("colors");
const dotenv = require("dotenv");
const cors = require("cors");
const morgan = require("morgan");

//! Import TaskSchema
const Task = require("./models/taskSchema");

const app = express();
dotenv.config({ path: "./env" });
app.use(express.json());
app.use(cors());

if (process.env.MODE === "development") {
  app.use(morgan("dev"));
}
const PORT = process.env.PORT || 3001;

const connectDB = require("./config/db");
connectDB();

//! HOSTING
app.listen(PORT, console.log(`Server listening on ${PORT}`.brightYellow.bold));

//! METHODS

app.get("/tasks", async (req, res) => {
  const tasksList = await Task.find();
  res.json(tasksList);
});

app.post("/tasks/new", async (req, res) => {
  try {
    const task = new Task(req.body);
    await task.save();
    res.status(200).send("Task created");
    // console.log("task created");
  } catch (err) {
    res.status(404).send(err);
  }
});

app.delete("/tasks/delete/:id", async (req, res) => {
  try {
    const result = await Task.findByIdAndDelete(req.params.id);
    // res.json(result);
    res.status(200).send(result);
  } catch (err) {
    res.status(404).send(err);
  }
});

app.put("/tasks/update/:id", async (req, res) => {
  try {
    await Task.findById(req.params.id, (err, task) => {
      task.status = !task.status;
      task.save();
    });
    res.status(200).send(result);
  } catch (err) {
    res.status(404).send(err);
  }
});
