import mongoose from "mongoose";
import Membership from "../models/membershipModel.js";

//# 1. Retrieve All Members
export const getAllMembersip = async (req, res) => {
    try {
        
        const members = await Membership.find();
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
export const getMembershipById = async (req, res) => {
    try {
        const MembershipId = req.params.id;

        if (!mongoose.Types.ObjectId.isValid(MembershipId)) {
            return res.status(400).json({ message: "Invalid ObjectId format" });
        }

        const member = await Membership.findById(MembershipId);
        if (member) {
            res.json(member);
        } else {
            res.status(404).json({ message: "No Record Found :(" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create Membership
export const createMembership = async (req, res) => {
    try {
        const member = new Membership(req.body);
        const savedMember= await member.save();
        res.status(201).json(savedMember);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update Member
export const updateMembership = async (req, res) => {
    try {
        const MembershipId = req.params.id;

        if (!mongoose.Types.ObjectId.isValid(MembershipId)) {
            return res.status(400).json({ message: "Invalid ObjectId format" });
        }

        const updatedMember = await Membership.findByIdAndUpdate(MembershipId, req.body, { new: true });
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
export const deleteMembership = async (req, res) => {
    try {
        const MembershipId = req.params.id;

        if (!mongoose.Types.ObjectId.isValid(MembershipId)) {
            return res.status(400).json({ message: "Invalid ObjectId format" });
        }

        const deletedMember = await Membership.findByIdAndDelete(MembershipId);
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
    getAllMembersip,
    getMembershipById,
    createMembership,
    updateMembership,
    deleteMembership
  };