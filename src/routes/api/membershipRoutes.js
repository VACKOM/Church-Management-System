import express from 'express';
import membershipController from '../../controllers/membershipController.js'

const router = express.Router();

// Retrieve All Membership
router.get("/", membershipController.getAllMembersip);

// Retrieve One Bacenta
router.get("/:id", membershipController.getMembershipById);

// Create Bacenta
router.post("/", membershipController.createMembership);

// Update Bacenta
router.put("/:id", membershipController.updateMembership);

// Delete Bacenta
router.delete("/:id", membershipController.deleteMembership);

export default router;