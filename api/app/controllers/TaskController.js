"use strict";

const express = require("express");

const addTask = require("./task/addTask");
const getAllTask = require("./task/getAllTask");
const getSingleTask = require("./task/getSingleTask");
const markTask = require("./task/markTask");
const updateTask = require("./task/updateTask");
const deleteTask = require("./task/deleteTask");

const router = express.Router();

//! POST METHOD
router.post("/", addTask);

//! GET METHOD
router.get("/", getAllTask);
router.get("/:taskID", getSingleTask);

//! PUT METHOD
router.put("/:taskID", updateTask);

//! PATCH METHOD
router.patch("/:taskID", markTask);

//! DELETE METHOD
router.delete("/:taskID", deleteTask);
