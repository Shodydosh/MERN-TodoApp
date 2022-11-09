"use strict";

module.exports = function (app) {
  var getTask = require("../controllers/task/getSingleTask");
  var addTask = require("../controllers/task/addTask");
  var updateTask = require("../controllers/task/updateTask");
  var deleteTask = require("../controllers/task/deleteTask");

  app.route("/task").get(getTask);
  app.route("/tasks/add").post(addTask);
  app.route("/tasks/update/:id").patch(updateTask);
  app.route("/tasks/delete/:id").delete(deleteTask);
};
