const Task = require("../../models/taskSchema");

const express = require("express");

export default async function getAllTasks(req, res) {
  try {
    const { id: taskID } = req.params;
    const task = await Task.findOneAndUpdate({ id: taskID }, req.body, {
      new: true,
      runValidators: true,
    });

    // nếu không tồn tại task với id là req.params.id
    if (!task) {
      return res.status(404).send("No tasks found with id " + taskID);
    }

    // nếu updated thành công
    res.status(200).send("Task with id " + task + " has been updated");
  } catch (err) {
    res.status(500).send(err);
  }
}
