const express = require("express");
const bacentaController = require("../../controllers/bacentaController");

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

module.exports = router;

