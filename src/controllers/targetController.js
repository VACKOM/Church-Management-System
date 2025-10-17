
import mongoose from "mongoose";
import Target from "../models/targetModel.js";

// Create a new target
export const createTarget = async (req, res) => {
  try {
    const { targetName, centerName, performanceData } = req.body;

    // Validate the performanceData to ensure it's an array of months data
    if (!Array.isArray(performanceData) || performanceData.length !== 12) {
      return res.status(400).json({ message: 'Invalid performance data. Must include data for all 12 months.' });
    }

    // Add validation for numeric values in performanceData
    if (!performanceData.every(item => 
      typeof item.targetMembers === 'number' && item.targetMembers >= 0 &&
      typeof item.targetBacentas === 'number' && item.targetBacentas >= 0 &&
      typeof item.targetChurchAttendance === 'number' && item.targetChurchAttendance >= 0)) {
        return res.status(400).json({ message: 'Performance data contains invalid values.' });
    }

    // Create a new target document
    const newTarget = new Target({
      targetName,
      centerName,
      performanceData
    });

    // Save the target in the database
    await newTarget.save();

    return res.status(201).json({ message: 'Target created successfully', target: newTarget });
  } catch (error) {
    console.error('Error creating target:', error);
    return res.status(500).json({ message: 'Error creating target' });
  }
};

// Get all targets
export const getAllTargets = async (req, res) => {
  try {
    const targets = await Target.find();
    return res.status(200).json(targets);
  } catch (error) {
    console.error('Error fetching targets:', error);
    return res.status(500).json({ message: 'Error fetching targets' });
  }
};

// Get a target by ID
export const getTargetById = async (req, res) => {
  try {
    const targetId = req.params.id;

    // Check if the targetId is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(targetId)) {
      return res.status(400).json({ message: 'Invalid target ID format.' });
    }

    const target = await Target.findById(targetId);

    if (!target) {
      return res.status(404).json({ message: 'Target not found' });
    }

    return res.status(200).json(target);
  } catch (error) {
    console.error('Error fetching target:', error);
    return res.status(500).json({ message: 'Error fetching target' });
  }
};

// Update monthly performance data for a target
export const updateMonthlyPerformance = async (req, res) => {
  try {
    const targetId = req.params.id;
    const { month, targetMembers, targetBacentas, targetChurchAttendance } = req.body;

    const validMonths = [
      'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 
      'September', 'October', 'November', 'December'
    ];
    
    // Validate month
    if (!validMonths.includes(month)) {
      return res.status(400).json({ message: 'Invalid month name.' });
    }

    // Validate the presence of required performance data
    if (!month || !targetMembers || !targetBacentas || !targetChurchAttendance) {
      return res.status(400).json({ message: 'Missing required data for monthly performance' });
    }

    const target = await Target.findById(targetId);

    if (!target) {
      return res.status(404).json({ message: 'Target not found' });
    }

    // Find the month in the performanceData array and update it
    const monthIndex = target.performanceData.findIndex(item => item.month === month);
    if (monthIndex === -1) {
      return res.status(404).json({ message: 'Month not found' });
    }

    // Update the performance data for the month
    target.performanceData[monthIndex].targetMembers = targetMembers;
    target.performanceData[monthIndex].targetBacentas = targetBacentas;
    target.performanceData[monthIndex].targetChurchAttendance = targetChurchAttendance;

    // Save the updated target
    await target.save();

    return res.status(200).json({ message: 'Monthly performance updated successfully', target });
  } catch (error) {
    console.error('Error updating monthly performance:', error);
    return res.status(500).json({ message: 'Error updating monthly performance' });
  }
};

// Update yearly summary for a target (optional)
export const updateYearlySummary = async (req, res) => {
  try {
    const targetId = req.params.id;

    const target = await Target.findById(targetId);

    if (!target) {
      return res.status(404).json({ message: 'Target not found' });
    }

    if (!target.performanceData.length) {
      return res.status(400).json({ message: 'No performance data available to calculate the yearly summary.' });
    }

    // Calculate yearly summary based on performance data
    const yearlySummary = target.performanceData.reduce((summary, monthData) => {
      summary.totalMembers += monthData.targetMembers || 0;
      summary.totalBacentas += monthData.targetBacentas || 0;
      summary.totalChurchAttendance += monthData.targetChurchAttendance || 0;
      return summary;
    }, { totalMembers: 0, totalBacentas: 0, totalChurchAttendance: 0 });

    // Update the yearly summary in the target
    target.yearlySummary = yearlySummary;

    // Save the updated target
    await target.save();

    return res.status(200).json({ message: 'Yearly summary updated successfully', target });
  } catch (error) {
    console.error('Error updating yearly summary:', error);
    return res.status(500).json({ message: 'Error updating yearly summary' });
  }
};

// Delete a target
export const deleteTarget = async (req, res) => {
  try {
    const targetId = req.params.id;

    // Check if the targetId is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(targetId)) {
      return res.status(400).json({ message: 'Invalid target ID format.' });
    }

    const target = await Target.findById(targetId);

    if (!target) {
      return res.status(404).json({ message: 'Target not found' });
    }

    // Delete the target
    await Target.findByIdAndDelete(targetId);

    return res.status(200).json({ message: 'Target deleted successfully' });
  } catch (error) {
    console.error('Error deleting target:', error);
    return res.status(500).json({ message: 'Error deleting target' });
  }
};


export default {
  getAllTargets,
  getTargetById,
  createTarget,
  updateMonthlyPerformance,
  updateYearlySummary,
  deleteTarget
};
