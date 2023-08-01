const express = require("express");
const router = express.Router();
const Task = require("../models/task");
const Status = require("../models/status");

const tasksMap = new Map();


router.get("/tasks", (req, res) => {
  console.log("Received a request to get all tasks");
  try {
    const dataArray = [];
    for (let [key, value] of tasksMap) {
      dataArray.push(value);
    }
    res.status(201).send(dataArray);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.get("/tasks/:title", (req, res) => {
  console.log("Received a request to get a tasks with title %s", req.params.title);
  try {
    if (!tasksMap.has(req.params.title)) {
      res.status(400).send("Task not found");
      return;
    }
    console.log("Found a task with title %s, sharing the same response", req.params.title);
    res.status(201).send(tasksMap.get(req.params.title));
  } catch (e) {
    res.status(500).send(e);
  }
});

router.post("/tasks", (req, res) => {
  console.log("Received a request to add a task");
  try {
    const title = req.body.title;
    const description = req.body.description;
    const due_date = req.body.due_date;
    const status = req.body.status;

    if (title === undefined || due_date === undefined) {
      res.status(400).send("Title and due date are required fields");
      return;
    }

    if (!Object.values(Status).includes(status)) {
      res.status(400).send("Invalid status passed. Please pass one of pending, completed and cancelled as the status");
      return;
    }

    const due_date_in_proper_format = new Date(due_date);

    if (due_date_in_proper_format < new Date()) {
      res.status(400).send("Invalid date passed. Please pass appropriate due date");
      return;
    }

    const task = new Task(title, description, due_date_in_proper_format, status);

    tasksMap.set(task.title, task);
    console.log("Added task with title %s to stack", task.title);

    res.status(201).send(task);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.put("/tasks/:title", (req, res) => {
  console.log("Received a request to update a task with title %s", req.params.title);
  try {
    const title = req.params.title;
    const description = req.body.description;
    const due_date = req.body.due_date;
    const status = req.body.status;

    if (title === undefined || due_date === undefined) {
      res.status(400).send("Title and due date are required fields");
      return;
    }

    if (!Object.values(Status).includes(status)) {
      res.status(400).send("Invalid status passed. Please pass one of pending, completed and cancelled as the status");
      return;
    }

    const due_date_in_proper_format = new Date(due_date);

    if (due_date_in_proper_format < new Date()) {
      res.status(400).send("Invalid date passed. Please pass appropriate due date");
      return;
    }


    const isTaskPresent = tasksMap.has(title);


    if (!isTaskPresent) {
      res.status(404).send("Task not found");
      return;
    }

    const task = new Task(title, description, due_date_in_proper_format, status);
    tasksMap.set(task.title, task);
    console.log("Updated the task with title %s", task.title);

    res.status(200).send(task);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.delete("/tasks/:title", (req, res) => {
  console.log("Received a request to delete a task with title %s", req.params.title);
  try {
    const title = req.params.title;

    const isTaskPresent = tasksMap.has(title);


    if (!isTaskPresent) {
      res.status(404).send("Task not found");
      return;
    }

    tasksMap.delete(title);

    res.status(200).send("Task successfully deleted");
  } catch (e) {
    res.status(500).send(e);
  }
});

module.exports = router;