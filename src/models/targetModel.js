import mongoose from "mongoose";

// Schema for monthly performance data
const monthSchema = new mongoose.Schema({
  month: { type: String, required: true },
  targetMembers: { type: Number, required: true },
  targetBacentas: { type: Number, required: true },
  targetChurchAttendance: { type: Number, required: true }
});

// Main target schema
const targetSchema = new mongoose.Schema({
  targetName: { type: String, required: true },
  centerName: { type: String, required: true },
  // You can store the full-year performance in a single array of month data
  performanceData: [monthSchema],  // An array of months with their respective performance data
  
  // Optionally, you can store the yearly summary data for quick reference
  yearlySummary: {
    totalMembers: { type: Number },
    totalBacentas: { type: Number },
    totalChurchAttendance: { type: Number },
  }
}, 
{
  timestamps: true,
  collection: 'targets'
});


const Target= mongoose.model('Target', targetSchema);

export default Target;

