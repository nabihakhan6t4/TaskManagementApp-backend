const Task = require("../models/Task");
const User = require("../models/User");
const excelJS = require("exceljs");
// @desc    Export all tasks as an Excel file
// @route   GET/api/reports/export/tasks
// @access  Private (Admin)
const exportTasksReport = async (req, res) => {
  try {
    const tasks = await Task.find().populate("assignedTo", "name email");
    const workbook = new excelJS.Workbook();
    const worksheet = workbook.addWorksheet("Tasks Report");

    worksheet.columns = [
      { header: "Task ID", key: "_id", width: 25 },
      { header: "Title", key: "title", width: 30 },
      { header: "Description", key: "description", width: 50 },
      { header: "Priority", key: "priority", width: 15 },
      { header: "Status", key: "status", width: 20 },
      { header: "Due Date", key: "dueDate", width: 20 },
      { header: "Assigned To", key: "assignedTo", width: 30 },
    ];

    tasks.forEach((task) => {
      const assignedTo =
        task.assignedTo && task.assignedTo.length > 0
          ? task.assignedTo
              .map((user) => `${user.name} {${user.email}}`)
              .join(", ")
          : "Unassigned";

      worksheet.addRow({
        _id: task._id.toString(),
        title: task.title,
        description: task.description,
        priority: task.priority,
        status: task.status,
        dueDate: task.dueDate ? task.dueDate.toISOString().split("T")[0] : "",
        assignedTo: assignedTo || "Unassigned",
      });
    });

    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader(
      "Content-Disposition",
      "attachment; filename=tasks_report.xlsx"
    );

    return workbook.xlsx.write(res).then(() => {
      res.end();
    });
  } catch (error) {
    res.status(500).json({
      message: "Error exporting tasks",
      error: error.message,
    });
  }
};

// @desc    Export user-task report as an Excel file
// @route   GET/api/reports/export/users
// @access  Private (Admin)
const exportUsersReport = async (req, res) => {
  try {
    const users = await User.find().select("name email _id").lean();
    const userTasks = await Task.find()
      .populate("assignedTo", "name email _id")
      .lean();

    const userTaskMap = {};
    users.forEach((user) => {
      userTaskMap[user._id.toString()] = {
        name: user.name,
        email: user.email,
        taskCount: 0,
        pendingTasks: 0,
        inProgressTasks: 0,
      };
    });

    userTasks.forEach((task) => {
      if (task.assignedTo && Array.isArray(task.assignedTo)) {
        task.assignedTo.forEach((assignedUser) => {
          const uid = assignedUser._id.toString();
          if (userTaskMap[uid]) {
            userTaskMap[uid].taskCount += 1;
            if (task.status === "Pending") {
              userTaskMap[uid].pendingTasks += 1;
            } else if (task.status === "In Progress") {
              userTaskMap[uid].inProgressTasks += 1;
            }
          }
        });
      }
    });

    // Excel workbook
    const workbook = new excelJS.Workbook();
    const worksheet = workbook.addWorksheet("Users Report");

    worksheet.columns = [
      { header: "User ID", key: "_id", width: 25 },
      { header: "Name", key: "name", width: 25 },
      { header: "Email", key: "email", width: 35 },
      { header: "Total Tasks", key: "taskCount", width: 15 },
      { header: "Pending Tasks", key: "pendingTasks", width: 20 },
      { header: "In Progress Tasks", key: "inProgressTasks", width: 25 },
    ];

    Object.keys(userTaskMap).forEach((uid) => {
      worksheet.addRow({
        _id: uid,
        name: userTaskMap[uid].name,
        email: userTaskMap[uid].email,
        taskCount: userTaskMap[uid].taskCount,
        pendingTasks: userTaskMap[uid].pendingTasks,
        inProgressTasks: userTaskMap[uid].inProgressTasks,
      });
    });

    worksheet.getRow(1).eachCell((cell) => {
      cell.font = { bold: true };
    });

    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader(
      "Content-Disposition",
      "attachment; filename=users_report.xlsx"
    );

    await workbook.xlsx.write(res);
    res.end();
  } catch (error) {
    res.status(500).json({
      message: "Error exporting users",
      error: error.message,
    });
  }
};

module.exports = {
  exportTasksReport,
  exportUsersReport,
};
