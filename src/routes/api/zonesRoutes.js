const express = require("express");
const zoneController = require("../../controllers/zoneController");

const router = express.Router();

// Retrieve All Bacentas
router.get("/", zoneController.getAllZones);

// Retrieve One Bacenta
router.get("/:id", zoneController.getZoneById);

// Create Bacenta
router.post("/", zoneController.createZone);

// Update Bacenta
router.put("/:id", zoneController.updateZone);

// Delete Bacenta
router.delete("/:id", zoneController.deleteZone);

module.exports = router;