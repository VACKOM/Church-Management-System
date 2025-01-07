const express = require("express");
const router = express.Router();
const targetController = require('../../controllers/targetController'); // Assuming your controller is in the controllers folder

// Route to create a new target
router.post('/create', targetController.createTarget);

// Route to get all targets
router.get('/', targetController.getAllTargets);

// Route to get a target by its ID 
router.get('/:id', targetController.getTargetById);

// Route to update monthly performance data for a target
router.put('/:id/update-performance', targetController.updateMonthlyPerformance);

// Route to update yearly summary for a target
router.put('/:id/update-summary', targetController.updateYearlySummary);

// Route to delete a target by its ID
router.delete('/:id', targetController.deleteTarget);

module.exports = router;
