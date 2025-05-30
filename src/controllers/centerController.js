const mongoose = require("mongoose");
const Center = require("../models/centerModel");

//# 1. Retrieve All Centers
exports.getAllCenters = async (req, res) => {
    try {
        
        const centers = await Center.find();
        if (centers.length > 0) {
            res.json(centers);
        } else {
            res.status(404).json({ message: "No Records Found :(" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Retrieve One Center
exports.getCenterById = async (req, res) => {
    try {
        const centerId = req.params.id;

        if (!mongoose.Types.ObjectId.isValid(centerId)) {
            return res.status(400).json({ message: "Invalid ObjectId format" });
        }

        const center = await Center.findById(centerId);
        if (center) {
            res.json(center);
        } else {
            res.status(404).json({ message: "No Record Found :(" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create Center
exports.createCenter = async (req, res) => {
    try {
        const center = new Center(req.body);
        const savedCenter= await center.save();
        res.status(201).json(savedCenter);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update Center
exports.updateCenter = async (req, res) => {
    try {
        const centerId = req.params.id;

        if (!mongoose.Types.ObjectId.isValid(centerId)) {
            return res.status(400).json({ message: "Invalid ObjectId format" });
        }

        const updatedCenter = await Center.findByIdAndUpdate(centerId, req.body, { new: true });
        if (updatedCenter) {
            res.json(updatedCenter);
        } else {
            res.status(404).json({ message: "No Record Found to Update :(" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete Center
exports.deleteCenter = async (req, res) => {
    try {
        const centerId = req.params.id;

        if (!mongoose.Types.ObjectId.isValid(centerId)) {
            return res.status(400).json({ message: "Invalid ObjectId format" });
        }

        const deletedCenter = await Center.findByIdAndDelete(centerId);
        if (deletedCenter) {
            res.json({ message: "Record Deleted Successfully" });
        } else {
            res.status(404).json({ message: "No Record Found to Delete :(" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
