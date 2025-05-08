const mongoose = require("mongoose");
const Bacenta = require("../models/bacentaModel"); // Assuming Bacenta is exported correctly

// Retrieve All Bacentas 
exports.getAllBacentas = async (req, res) => {
    try {
        const bacentas = await Bacenta.find();
        if (bacentas.length > 0) {
            res.json(bacentas);
        } else {
            res.status(404).json({ message: "No Records Found :(" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Retrieve One Bacenta
exports.getBacentaById = async (req, res) => {
    try {
        const bacentaId = req.params.id;

        if (!mongoose.Types.ObjectId.isValid(bacentaId)) {
            return res.status(400).json({ message: "Invalid ObjectId format" });
        }

        const bacenta = await Bacenta.findById(bacentaId);
        if (bacenta) {
            res.json(bacenta);
        } else {
            res.status(404).json({ message: "No Record Found :(" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create Bacenta 
exports.createBacenta = async (req, res) => {
    try {
        const bacenta = new Bacenta(req.body);
        const savedBacenta = await bacenta.save();
        res.status(201).json(savedBacenta);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update Bacenta
exports.updateBacenta = async (req, res) => {
    try {
        const bacentaId = req.params.id;

        if (!mongoose.Types.ObjectId.isValid(bacentaId)) {
            return res.status(400).json({ message: "Invalid ObjectId format" });
        }

        const updatedBacenta = await Bacenta.findByIdAndUpdate(bacentaId, req.body, { new: true });
        if (updatedBacenta) {
            res.json(updatedBacenta);
        } else {
            res.status(404).json({ message: "No Record Found to Update :(" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete Bacenta
exports.deleteBacenta = async (req, res) => {
    try {
        const bacentaId = req.params.id;

        if (!mongoose.Types.ObjectId.isValid(bacentaId)) {
            return res.status(400).json({ message: "Invalid ObjectId format" });
        }

        const deletedBacenta = await Bacenta.findByIdAndDelete(bacentaId);
        if (deletedBacenta) {
            res.json({ message: "Record Deleted Successfully" });
        } else {
            res.status(404).json({ message: "No Record Found to Delete :(" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
