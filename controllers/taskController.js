const Task = require("../models/Task");

// @desc Get all tasks (Admin : all, User:only assigned tasks)
// @route GET/api/tasks
// @access Private

const getTasks = async (req, res) => {
  try {
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc Get  task by ID
// @route GET/api/tasks/:id
// @access Private

const getTaskByID = async (req, res) => {
  try {
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc Create a new   task (Admin only )
// @route POST/api/tasks/
// @access Private (Admin)
const createTask = async (req, res) => {
  try {
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc Update task details
// @route PUT/api/tasks/:id
// @access Private

const updateTask = async (req, res) => {
  try {
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc Delete a  task (Admin only)
// @route DELETE/api/tasks/:id
// @access Private (Admin)

const deleteTask = async (req, res) => {
  try {
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc Update  task status
// @route DELETE/api/tasks/:id/status
// @access Private

const updateTaskStatus = async (req, res) => {
  try {
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc Update  task checklist
// @route DELETE/api/tasks/:id/todo
// @access Private

const updateTaskSChecklist = async (req, res) => {
  try {
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc Dashboard Data (Admin only)
// @route GET/api/tasks/dashboard-data
// @access Private

const getDashboardData = async (req, res) => {
  try {
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc Dashboard Data (User-specific )
// @route GET/api/tasks/user-dashboard-data
// @access Private

const getUserDashboardData = async (req, res) => {
  try {
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = {
  getTasks,
  getTaskByID,
  createTask,
  updateTask,
  deleteTask,
  updateTaskStatus,
  updateTaskSChecklist,
  getDashboardData,
  getUserDashboardData,
};
