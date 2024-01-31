const express = require("express");
const router = express.Router();

const {
  getAllTasks,
  createTask,
  taskOrderUpdate,
  updateTask,
  deleteTask,
} = require("../controllers/taskController.js");
router.route("/").get(getAllTasks).post(createTask).put(taskOrderUpdate);

router.route("/:id").put(updateTask).delete(deleteTask);

module.exports = router;
