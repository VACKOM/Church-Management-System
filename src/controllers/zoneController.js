const mongoose = require("mongoose");
const Zone = require("../models/zoneModel");

//# 1. Retrieve All Zones
exports.getAllZones = async (req, res) => {
    try {
        
        const zones = await Zone.find();
        if (zones.length > 0) {
            res.json(zones);
        } else {
            res.status(404).json({ message: "No Records Found :(" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Retrieve One Zone
exports.getZoneById = async (req, res) => {
    try {
        const zoneId = req.params.id;
     
        if (!mongoose.Types.ObjectId.isValid(zoneId)) {
            return res.status(400).json({ message: "Invalid ObjectId format" });
        }

        const zone = await Zone.findById(zoneId);
        if (zone) {
            res.json(zone);
        } else {
            res.status(404).json({ message: "No Record Found :(" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create Zone
exports.createZone = async (req, res) => {
    try {
        const zone = new Zone(req.body);
        const savedZone= await zone.save();
        res.status(201).json(savedZone);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update Zone
exports.updateZone = async (req, res) => {
    try {
        const zoneId = req.params.id;

        if (!mongoose.Types.ObjectId.isValid(zoneId)) {
            return res.status(400).json({ message: "Invalid ObjectId format" });
        }

        const updatedZone = await Zone.findByIdAndUpdate(zoneId, req.body, { new: true });
        if (updatedZone) {
            res.json(updatedZone);
        } else {
            res.status(404).json({ message: "No Record Found to Update :(" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete Zone
exports.deleteZone = async (req, res) => {
    try {
        const zoneId = req.params.id;

        if (!mongoose.Types.ObjectId.isValid(zoneId)) {
            return res.status(400).json({ message: "Invalid ObjectId format" });
        }

        const deletedZone = await Zone.findByIdAndDelete(zoneId);
        if (deletedZone) {
            res.json({ message: "Record Deleted Successfully" });
        } else {
            res.status(404).json({ message: "No Record Found to Delete :(" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
