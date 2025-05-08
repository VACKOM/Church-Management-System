const express = require("express");
const centerController = require("../../controllers/centerController");

const router = express.Router();

// Retrieve All Bacentas
router.get("/", centerController.getAllCenters);

// Retrieve One Bacenta
router.get("/:id", centerController.getCenterById);

// Create Bacenta
router.post("/", centerController.createCenter);

// Update Bacenta
router.put("/:id", centerController.updateCenter);

// Delete Bacenta
router.delete("/:id", centerController.deleteCenter);

module.exports = router;