import express from 'express';
import zoneController from '../../controllers/zoneController.js'

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

export default router;