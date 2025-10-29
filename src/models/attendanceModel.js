import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema(
  {
    date: { type: Date, required: true },
    bacentaMembersNo: { type: Number, required: true },
    childrenAttendance: { type: Number, required: true },
    adultAttendance: { type: Number, required: true },
    soulsInChurch: { type: Number, required: true },
    bacentaMeetingAttendance: { type: Number, required: true },
    newBelieversSchoolAttendance: { type: Number, required: true },
    membersAbsent: { type: Number, required: true },
    offering:{type: Number, required: true},
    center: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Center",      // Must match the model name of your Center schema
        required: true      // Optional, but recommended if every Zone must have a Center
      },
    
    zone: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Zone",      // Must match the model name of your Zone schema
        required: true      // Optional, but recommended if every Zone must have a Center
      },
    bacenta: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Bacenta",      // Must match the model name of your Zone schema
        required: true      // Optional, but recommended if every Zone must have a Center
      },
   
    laySchoolAttendance: { type: Number, required: true }
  },
  {
    timestamps: true,
    collection: "attendances" // Correct placement of collection name
  }
);

const Attendance = mongoose.model("Attendance", attendanceSchema);

export default Attendance;
