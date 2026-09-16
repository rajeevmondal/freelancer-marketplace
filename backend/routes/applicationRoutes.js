const express = require("express");

const {
    applyToProject,
    getProjectApplications,
    updateApplicationStatus,
    getMyApplications
} = require("../controllers/applicationController");

const {
    protect,
    authorizeRoles
} = require("../middleware/authMiddleware");

const router = express.Router();


// Freelancer can apply for a project
router.post(
    "/apply",
    protect,
    authorizeRoles("Freelancer"),
    applyToProject
);


// Client can view applications for their project
router.get(
    "/project/:projectId",
    protect,
    authorizeRoles("Client"),
    getProjectApplications
);


// Client can accept/reject application
router.put(
    "/:applicationId/status",
    protect,
    authorizeRoles("Client"),
    updateApplicationStatus
);


// Freelancer can view their own applications
router.get(
    "/my-applications",
    protect,
    authorizeRoles("Freelancer"),
    getMyApplications
);


module.exports = router;