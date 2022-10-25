"use strict";

module.exports = function (app) {
  var getTask = require("./task/getTask");
  var addTask = require("./task/addTask");
  var updateTask = require("./task/updateTask");
  var deleteTask = require("./task/deleteTask");

  app.route("/task").get(getTask);
  app.route("/tasks/add").post(addTask);
  app.route("/tasks/update/:id").patch(updateTask);
  app.route("/tasks/delete/:id").delete(deleteTask);
};
