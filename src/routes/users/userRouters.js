const express = require("express");
const { authenticate, authorize } = require('../../middlewares/authMiddleware');
const upload = require('../../utilities/multer');  // Import the multer configuration
const userController = require('../../controllers/users/userController')

const router = express.Router();

// Retrieve All User
router.get("/", userController.getAllUsers);

// Retrieve One User
router.get("/:id", userController.getUserById);

// // Create User
// router.post("/", userController.createUser);

// Update User
router.put("/:id", userController.updateUser);

// Delete User
router.delete("/:id", userController.deleteUser);



// Only Bishop can access this route
router.get("/bishop", authenticate, authorize(['bishop']), (req, res) => {
    res.json({ message: "Welcome to Bishop's Dashboard" });
});

// Only Bishop and Lead_Pastor can access this route
router.get("/pastor", authenticate, authorize(['bishop', 'lead_pastor']), (req, res) => {
    res.json({ message: "Welcome to Lead Pastor's Dashboard" });
});


// Only Bishop, Lead_Pastor, Directors, and Center_Managers can access this route
router.get("/center", authenticate, authorize(['bishop', 'lead_pastor', 'center']), (req, res) => {
    res.json({ message: "Welcome to Center Manager's Dashboard" });
});

// Only Bishop, Lead_Pastor, and Zone_Manager can access this route
router.get("/zone", authenticate, authorize(['bishop', 'lead_pastor',  'center','zone']), (req, res) => {
    res.json({ message: "Welcome to Zone's Dashboard" });
});
// Only Bishop, Lead_Pastor, Directors, Center_Managers, Zone_Manager and Bacenta_Leaders can access this route
router.get("/bacenta", authenticate, authorize(['bishop', 'lead_pastor', 'center', 'bacenta','zone']), (req, res) => {
    res.json({ message: "Welcome to Bacenta Leader's Dashboard" });
});

// Route for creating a user, with file upload (e.g., profile image)
router.post('/', upload.single('profileImage'), async (req, res, next) => {
   
    next();  // Continue to the next middleware (which is the userController.createUser) 
  }, userController.createUser);

module.exports = router;
