const Task = require("../models/taskModel");
const asyncHandler = require("express-async-handler");

const getAllTasks = asyncHandler(async (req, res) => {
  const tasks = await Task.find().sort("order");
  res.status(200).json(tasks);
});

const createTask = asyncHandler(async (req, res) => {
  const { title } = req.body;
  if (!title) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }
  const task = await Task.create({
    title,
  });

  res.status(201).json(task);
});

const taskOrderUpdate = asyncHandler(async (req, res) => {
  const updatedTasks = req.body;
  updatedTasks.map(async (task, index) => {
    await Task.findByIdAndUpdate(task._id, { order: index });
  });
  res.status(200).json({ message: "Task Order updated Successfully" });
});

const updateTask = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const updatedOne = await Task.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  res.status(200).json(updatedOne);
});

const deleteTask = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const task = await Task.findById(id);
  if (!task) {
    res.status(404);
    throw new Error("task not found");
  }
  await task.deleteOne();
  res.status(200).json(task);
});

module.exports = {
  getAllTasks,
  createTask,
  taskOrderUpdate,
  updateTask,
  deleteTask,
};
