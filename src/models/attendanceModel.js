import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema(
  {
    date: { type: Date, required: true },
    sundayAttendance: { type: Number, required: true },
    childrenAttendance: { type: Number, required: true },
    adultAttendance: { type: Number, required: true },
    soulsInChurch: { type: Number, required: true },
    bacentaMeetingAttendance: { type: Number, required: true },
    newBelieversSchoolAttendance: { type: Number, required: true },
    membersAbsent: { type: Number, required: true },
    centerName: { type: String, required: true },
    bacentaName: { type: String, required: true },
    zoneName: { type: String, required: true },
    laySchoolAttendance: { type: Number, required: true }
  },
  {
    timestamps: true,
    collection: "attendances" // Correct placement of collection name
  }
);

const Attendance = mongoose.model("Attendance", attendanceSchema);

export default Attendance;
