const express = require("express");
const { authenticate, authorize } = require('../../middlewares/authMiddleware');

const router = express.Router();

// Only Bishop can access this route
router.get("/bishop", authenticate, authorize(['bishop']), (req, res) => {
    res.json({ message: "Welcome to Bishop's Dashboard" });
});

// Only Bishop and Lead_Pastor can access this route
router.get("/pastor", authenticate, authorize(['bishop', 'lead_pastor']), (req, res) => {
    res.json({ message: "Welcome to Lead Pastor's Dashboard" });
});


// Only Bishop, Lead_Pastor, Directors, and Center_Managers can access this route
router.get("/center", authenticate, authorize(['bishop', 'lead_pastor', 'center_manager']), (req, res) => {
    res.json({ message: "Welcome to Center Manager's Dashboard" });
});

// Only Bishop, Lead_Pastor, and Zone_Manager can access this route
router.get("/zone", authenticate, authorize(['bishop', 'lead_pastor',  'center_manager','zone_manager']), (req, res) => {
    res.json({ message: "Welcome to Zone's Dashboard" });
});
// Only Bishop, Lead_Pastor, Directors, Center_Managers, Zone_Manager and Bacenta_Leaders can access this route
router.get("/bacenta", authenticate, authorize(['bishop', 'lead_pastor', 'center_manager', 'bacenta_leader','zone_manager']), (req, res) => {
    res.json({ message: "Welcome to Bacenta Leader's Dashboard" });
});

module.exports = router;
