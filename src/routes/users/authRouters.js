const express = require("express");
const { register, login } = require("../../controllers/users/authController");
const router = express.Router();

router.post("/register" , register);
router.post("/login", login);

// Route for logging out (not strictly necessary for JWT, just clears the session on the client side)
router.post("/logout", (req, res) => {
    // In a stateless JWT system, you typically do not need to handle logout here.
    // However, you could clear any token stored in a cookie or session.
    
    // Example if you're storing the token in a cookie:
    //res.clearCookie("token");
    res.status(200).json({ message: "Logged out successfully!" });
});

module.exports = router;