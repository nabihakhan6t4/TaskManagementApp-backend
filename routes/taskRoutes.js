const express = require("express");
const { protect, adminOnly } = require("../middlewares/authMiddleware");
const {
  getDashboardData,
  getUserDashboardData,
  getTasks,
  getTaskByID,
  createTask,
  updateTask,
  deleteTask,
  updateTaskStatus,
  updateTaskSChecklist,
} = require("../controllers/taskController");
const router = express.Router();

// Task Management Routes
router.get("/dashboard-data", protect, getDashboardData);
router.get("/user-dashboard-data", protect, getUserDashboardData);
router.get("/", protect, getTasks); //Get all tasks (Admin:all , Users:assigned)
router.get("/:id", protect, getTaskByID); //Get task by ID
router.post("/", protect, adminOnly, createTask); // Create a task (Admin nly)
router.put("/:id", protect, updateTask); // Update task details
router.delete("/:id", protect, adminOnly, deleteTask); // Delete a task (Admin nly)
router.put("/:id/status", protect, updateTaskStatus); // Update task status
router.put("/:id/todo", protect, updateTaskSChecklist); // Update task checklist

module.exports = router;
