const express = require("express");
const { adminOnly, protect } = require("../middlewares/authMiddleware");
const router = express.Router();
router.get("/export/tasks", protect, adminOnly, exportTasksReports); //Export all tasks as Excel/PDF
router.get("/export/users", protect, adminOnly, exportUsersReport); //Export user-task report
module.exports = router;
