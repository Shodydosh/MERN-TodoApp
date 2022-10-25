const Task = require("../../models/taskSchema");

const express = require("express");

export default async function addTask(req, res) {
  try {
    const task = new Task(req.body);
    await task.save();
    res.status(200).send("New task has been created");
  } catch (err) {
    res.status(404).send(err);
  }
}
