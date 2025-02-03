const mongoose = require("mongoose");
const Attendance = require("../models/attendanceModel");


//# 1. Retrieve All Attendances
exports.getAllAttendances = async (req, res) => {
    try {
        
        const attendances = await Attendance.find();
        if (attendances.length > 0) {
            res.json(attendances);
        } else {
            res.status(404).json({ message: "No Records Found :(" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Retrieve One Attendance
exports.getAttendanceById = async (req, res) => {
    try {
        const centerId = req.params.id;

        if (!mongoose.Types.ObjectId.isValid(centerId)) {
            return res.status(400).json({ message: "Invalid ObjectId format" });
        }

        const center = await Attendance.findById(centerId);
        if (center) {
            res.json(center);
        } else {
            res.status(404).json({ message: "No Record Found :(" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create Attendance
exports.createAttendance = async (req, res) => {
    try {
        const center = new Attendance(req.body);
        const savedAttendance= await center.save();
        res.status(201).json(savedAttendance);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update Attendance
exports.updateAttendance = async (req, res) => {
    try {
        const centerId = req.params.id;

        if (!mongoose.Types.ObjectId.isValid(centerId)) {
            return res.status(400).json({ message: "Invalid ObjectId format" });
        }

        const updatedAttendance = await Attendance.findByIdAndUpdate(centerId, req.body, { new: true });
        if (updatedAttendance) {
            res.json(updatedAttendance);
        } else {
            res.status(404).json({ message: "No Record Found to Update :(" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete Attendance
exports.deleteAttendance = async (req, res) => {
    try {
        const centerId = req.params.id;

        if (!mongoose.Types.ObjectId.isValid(centerId)) {
            return res.status(400).json({ message: "Invalid ObjectId format" });
        }

        const deletedAttendance = await Attendance.findByIdAndDelete(centerId);
        if (deletedAttendance) {
            res.json({ message: "Record Deleted Successfully" });
        } else {
            res.status(404).json({ message: "No Record Found to Delete :(" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
