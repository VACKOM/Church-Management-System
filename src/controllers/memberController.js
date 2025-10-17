import mongoose from "mongoose";
import Member from "../models/memberModel.js";

//# 1. Retrieve All Members
export const getAllMembers = async (req, res) => {
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
export const getMemberById = async (req, res) => {
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
export const createMember = async (req, res) => {
    try {
        const member = new Member(req.body);
        const savedMember= await member.save();
        res.status(201).json(savedMember);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update Member
export const updateMember = async (req, res) => {
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
export const deleteMember = async (req, res) => {
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

export default {
    getAllMembers,
    getMemberById,
    createMember,
    updateMember,
    deleteMember
  };