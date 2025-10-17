import express from "express";
import { authenticate, authorize } from "../../middlewares/authMiddleware.js";
import upload from "../../utilities/multer.js"; // Import the multer configuration
import * as userController from "../../controllers/users/userController.js";

const router = express.Router();

// Retrieve All User
router.get("/", userController.getAllUsers);

// Retrieve One User
router.get("/:id", userController.getUserById);

// Retrieve user by contact (picture path)
router.get("/picturepath/:contact", userController.getUserByContact);

// Fetch all pictures
router.get("/pictures/:all", userController.getUserPictures);

// Update User
router.put("/:id", userController.updateUser);

// Delete User
router.delete("/:id", userController.deleteUser);

// Only Bishop can access this route
router.get("/bishop", authenticate, authorize(["bishop"]), (req, res) => {
    res.json({ message: "Welcome to Bishop's Dashboard" });
});

// Only Bishop and Lead_Pastor can access this route
router.get("/pastor", authenticate, authorize(["bishop", "lead_pastor"]), (req, res) => {
    res.json({ message: "Welcome to Lead Pastor's Dashboard" });
});

// Only Bishop, Lead_Pastor, and Center_Managers can access this route
router.get("/center", authenticate, authorize(["bishop", "lead_pastor", "center"]), (req, res) => {
    res.json({ message: "Welcome to Center Manager's Dashboard" });
});

// Only Bishop, Lead_Pastor, Center_Managers, and Zone_Managers can access this route
router.get("/zone", authenticate, authorize(["bishop", "lead_pastor", "center", "zone"]), (req, res) => {
    res.json({ message: "Welcome to Zone's Dashboard" });
});

// Bishop, Lead_Pastor, Center_Managers, Zone_Managers, and Bacenta_Leaders can access this route
router.get("/bacenta", authenticate, authorize(["bishop", "lead_pastor", "center", "zone", "bacenta"]), (req, res) => {
    res.json({ message: "Welcome to Bacenta Leader's Dashboard" });
});


// Route for creating a user, with file upload (e.g., profile image)
router.post('/', upload.single('profileImage'), async (req, res, next) => {
   console.log("picture to be uploaded")
    next();  // Continue to the next middleware (which is the userController.createUser) 
  }, userController.createUser);



export default router;

