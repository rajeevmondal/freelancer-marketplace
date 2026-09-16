const express = require("express");

const {
    registerUser,
    loginUser,
    updateProfile,
    getMyProfile
} = require("../controllers/authController");

const {
    protect
} = require("../middleware/authMiddleware");

const router = express.Router();


// Register
router.post("/register", registerUser);


// Login
router.post("/login", loginUser);


// Update Profile
router.put(
    "/profile",
    protect,
    updateProfile
);


// Get My Profile
router.get(
    "/profile",
    protect,
    getMyProfile
);


module.exports = router;