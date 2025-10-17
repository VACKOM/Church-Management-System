import express from 'express';
import bacentaController from '../../controllers/bacentaController.js'

const router = express.Router();

// Retrieve All Bacentas
router.get("/", bacentaController.getAllBacentas);

// Retrieve One Bacenta
router.get("/:id", bacentaController.getBacentaById);

// Create Bacenta
router.post("/", bacentaController.createBacenta);

// Update Bacenta
router.put("/:id", bacentaController.updateBacenta);

// Delete Bacenta
router.delete("/:id", bacentaController.deleteBacenta);

export default router;

