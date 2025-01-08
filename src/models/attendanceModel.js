const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
  bacentaMembership: { type: Number, required: true },
  adultAttendance: { type: Number, required: true },
  childrenAttendance: { type: Number, required: true },
  soulsInChurch: { type: Number, required: true },
  bacentaMeetingAttendance: { type: Number, required: true },
  newBelieversSchoolAttendance: { type: Number, required: true },
  membersAbsent: { type: Number, required: true },
  centerName: { type: String, required: true },
  bacentaName: { type: String, required: true },
  laySchoolAttendance: { type: Number, required: true },
  dateAttendance: {type: Date, required: true}
},
{
    timestamps: true,
    collection: 'attendances'  // Correct placement of collection name
}
);

module.exports = mongoose.model('Attendance', attendanceSchema);