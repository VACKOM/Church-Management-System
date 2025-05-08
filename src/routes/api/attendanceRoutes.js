const express = require("express");
const attendanceController = require("../../controllers/attendanceController");

const router = express.Router();

// Retrieve All Attendances
router.get("/", attendanceController.getAllAttendances);

// Retrieve One Attendance
router.get("/:id", attendanceController.getAttendanceById);

// Create Attendance
router.post("/", attendanceController.createAttendance);

// Update Attendance
router.put("/:id", attendanceController.updateAttendance);

// Delete Attendance
router.delete("/:id", attendanceController.deleteAttendance);

module.exports = router;

