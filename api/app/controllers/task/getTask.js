const Task = require("../../models/taskSchema");

const express = require("express");

const getAllTask = async function (req, res) {
  try {
    const tasksList = await Task.find();
    res.status(200).json(tasksList);
  } catch (err) {
    res.status(404).send(err);
  }
};

module.exports = getAllTask;
