const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
  member_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Member', required: true },
  date:{type:Date, required:true},
  service: { type: Number, required: true },
  status: { type: Number, required: true }
},
{
    timestamps: true,
    collection: 'attendances'  // Correct placement of collection name
}
);

module.exports = mongoose.model('Attendance', attendanceSchema);