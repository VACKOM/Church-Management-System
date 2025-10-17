
import express from 'express';
import attendanceController from '../../controllers/attendanceController.js';

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

export default router;

