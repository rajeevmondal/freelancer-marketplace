const express = require("express");

const {
    createProject,
    getAllProjects,
    completeProject,
    getMyProjects,
    searchProjects
} = require("../controllers/projectController");

const {
    protect,
    authorizeRoles
} = require("../middleware/authMiddleware");

const router = express.Router();


// Client can create project
router.post(
    "/",
    protect,
    authorizeRoles("Client"),
    createProject
);


// Search and filter projects
router.get(
    "/search",
    protect,
    searchProjects
);


// Get all projects
router.get(
    "/",
    protect,
    getAllProjects
);


// Client can mark project as Completed
router.put(
    "/:projectId/complete",
    protect,
    authorizeRoles("Client"),
    completeProject
);


// Client can view their own projects
router.get(
    "/my-projects",
    protect,
    authorizeRoles("Client"),
    getMyProjects
);


module.exports = router;