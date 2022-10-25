const Task = require("../../models/taskSchema");

const express = require("express");

export default async function getAllTasks(req, res) {
  try {
    const result = await Task.findByIdAndDelete(req.params.id);
    res.status(200).send("Task has been deleted");
  } catch (err) {
    res.status(500).send(err);
  }
}
