const express = require("express");
const colors = require("colors");
const dotenv = require("dotenv");
const cors = require("cors");
const morgan = require("morgan");
// const routes = require("./app/routes/TaskRoutes");s

//! Import TaskSchema
const Task = require("./app/models/taskSchema");

const app = express();
dotenv.config({ path: "./env" });
app.use(express.json());
app.use(cors());

if (process.env.MODE === "development") {
  app.use(morgan("dev"));
}
const PORT = process.env.PORT || 3001;

//! DATABASE CONNECT
const connectDB = require("./database/db");
connectDB();

//! ROUTES
routes(app);

//! HOSTING
app.listen(PORT, console.log(`Server listening on ${PORT}`.brightYellow.bold));

app.get("/tasks", async (req, res) => {
  const tasksList = await Task.find();
  res.json(tasksList);
});

app.post("/tasks/new", async (req, res) => {
  try {
    const task = new Task(req.body);
    await task.save();
    res.status(200).send("Task created");
  } catch (err) {
    res.status(404).send(err);
  }
});

app.delete("/tasks/delete/:id", async (req, res) => {
  try {
    const result = await Task.findByIdAndDelete(req.params.id);
    // res.json(result);
    res.status(200).send("Task has been deleted");
  } catch (err) {
    res.status(404).send(err);
  }
});

app.put("/tasks/update/:id", async (req, res) => {
  try {
    const { id: taskID } = req.params;
    const updatedTask = new Task.findById(taskID);
    console.log(updatedTask);
    updatedTask.status = !updatedTask.status;

    const task = await Task.findOneAndUpdate({ _id: taskID }, updatedTask, {
      new: true,
      runValidators: true,
    });
    if (!task) {
      return res.status(404).json({ msg: `No task with id: ${taskID}` });
    }
    res.status(200).json({ task });
  } catch (err) {
    res.status(500).json({ msg: err });
  }
});
