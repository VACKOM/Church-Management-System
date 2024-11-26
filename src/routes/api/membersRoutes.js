const express = require("express");
const memberController = require("../../controllers/memberController");

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

module.exports = router;