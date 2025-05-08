const mongoose = require("mongoose");
const Member = require("../models/memberModel");

//# 1. Retrieve All Members
exports.getAllMembers = async (req, res) => {
    try {
        
        const members = await Member.find();
        if (members.length > 0) {
            res.json(members);
        } else {
            res.status(404).json({ message: "No Records Found :(" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Retrieve One Member
exports.getMemberById = async (req, res) => {
    try {
        const memberId = req.params.id;

        if (!mongoose.Types.ObjectId.isValid(memberId)) {
            return res.status(400).json({ message: "Invalid ObjectId format" });
        }

        const member = await Member.findById(memberId);
        if (member) {
            res.json(member);
        } else {
            res.status(404).json({ message: "No Record Found :(" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create Member
exports.createMember = async (req, res) => {
    try {
        const member = new Member(req.body);
        const savedMember= await member.save();
        res.status(201).json(savedMember);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update Member
exports.updateMember = async (req, res) => {
    try {
        const MemberId = req.params.id;

        if (!mongoose.Types.ObjectId.isValid(memberId)) {
            return res.status(400).json({ message: "Invalid ObjectId format" });
        }

        const updatedMember = await Member.findByIdAndUpdate(memberId, req.body, { new: true });
        if (updatedMember) {
            res.json(updatedMember);
        } else {
            res.status(404).json({ message: "No Record Found to Update :(" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete Member
exports.deleteMember = async (req, res) => {
    try {
        const memberId = req.params.id;

        if (!mongoose.Types.ObjectId.isValid(memberId)) {
            return res.status(400).json({ message: "Invalid ObjectId format" });
        }

        const deletedMember = await Member.findByIdAndDelete(memberId);
        if (deletedMember) {
            res.json({ message: "Record Deleted Successfully" });
        } else {
            res.status(404).json({ message: "No Record Found to Delete :(" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};