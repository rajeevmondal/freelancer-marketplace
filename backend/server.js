const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const projectRoutes = require("./routes/projectRoutes");
const applicationRoutes = require("./routes/applicationRoutes");


const {
    protect,
    authorizeRoles
} = require("./middleware/authMiddleware");

dotenv.config();

// Connect MongoDB
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Authentication routes
app.use("/api/auth", authRoutes);


// Project routes
app.use("/api/projects", projectRoutes);
app.use("/api/applications", applicationRoutes);

// Home/Test route
app.get("/", (req, res) => {
    res.send("Freelancer Marketplace API is running...");
});

// Protected test route
app.get("/api/protected", protect, (req, res) => {
    res.json({
        message: "You accessed a protected route!",
        user: req.user
    });
});

// Client-only test route
app.get(
    "/api/client-only",
    protect,
    authorizeRoles("Client"),
    (req, res) => {
        res.json({
            message: "Welcome Client! You can access this route.",
            user: req.user
        });
    }
);

// Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});