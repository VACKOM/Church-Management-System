import express from 'express';
import memberController from '../../controllers/memberController.js'

const router = express.Router();

// Retrieve All Bacentas
router.get("/", memberController.getAllMembers);

// Retrieve One Bacenta
router.get("/:id", memberController.getMemberById);

// Create Bacenta
router.post("/", memberController.createMember);

// Update Bacenta
router.put("/:id", memberController.updateMember);

// Delete Bacenta
router.delete("/:id", memberController.deleteMember);

export default router;