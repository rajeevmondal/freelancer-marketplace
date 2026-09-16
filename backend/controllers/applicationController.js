const Application = require("../models/Application");
const Project = require("../models/Project");

// Freelancer applies for a project
const applyToProject = async (req, res) => {
    try {
        const { projectId, proposal, bidAmount } = req.body;

        if (!projectId || !proposal || !bidAmount) {
            return res.status(400).json({
                message: "Please provide projectId, proposal and bidAmount"
            });
        }

        const project = await Project.findById(projectId);

        if (!project) {
            return res.status(404).json({
                message: "Project not found"
            });
        }

        if (project.status !== "Open") {
            return res.status(400).json({
                message: "This project is not open for applications"
            });
        }

        const existingApplication = await Application.findOne({
            project: projectId,
            freelancer: req.user.id
        });

        if (existingApplication) {
            return res.status(400).json({
                message: "You have already applied for this project"
            });
        }

        const application = await Application.create({
            project: projectId,
            freelancer: req.user.id,
            proposal,
            bidAmount
        });

        res.status(201).json({
            message: "Application submitted successfully",
            application
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to submit application",
            error: error.message
        });
    }
};


// Get applications for a project
const getProjectApplications = async (req, res) => {
    try {
        const { projectId } = req.params;

        const project = await Project.findById(projectId);

        if (!project) {
            return res.status(404).json({
                message: "Project not found"
            });
        }

        if (project.client.toString() !== req.user.id) {
            return res.status(403).json({
                message: "You can only view applications for your own project"
            });
        }

        const applications = await Application.find({
            project: projectId
        })
            .populate("freelancer", "name email skills bio")
            .sort({ createdAt: -1 });

        res.status(200).json({
            message: "Applications fetched successfully",
            applications
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch applications",
            error: error.message
        });
    }
};


// Accept / Reject application
const updateApplicationStatus = async (req, res) => {
    try {
        const { applicationId } = req.params;
        const { status } = req.body;

        if (!["Accepted", "Rejected"].includes(status)) {
            return res.status(400).json({
                message: "Status must be Accepted or Rejected"
            });
        }

        const application = await Application.findById(applicationId);

        if (!application) {
            return res.status(404).json({
                message: "Application not found"
            });
        }

        const project = await Project.findById(application.project);

        if (!project) {
            return res.status(404).json({
                message: "Project not found"
            });
        }

        if (project.client.toString() !== req.user.id) {
            return res.status(403).json({
                message: "You can only update applications for your own project"
            });
        }

        application.status = status;
        await application.save();

        if (status === "Accepted") {
            project.status = "In Progress";
            await project.save();
        }

        res.status(200).json({
            message: `Application ${status.toLowerCase()} successfully`,
            application
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to update application status",
            error: error.message
        });
    }
};


// Freelancer gets his/her own applications
const getMyApplications = async (req, res) => {
    try {
        const applications = await Application.find({
            freelancer: req.user.id
        })
            .populate("project", "title description budget deadline status client")
            .sort({ createdAt: -1 });

        res.status(200).json({
            message: "Your applications fetched successfully",
            applications
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch your applications",
            error: error.message
        });
    }
};


module.exports = {
    applyToProject,
    getProjectApplications,
    updateApplicationStatus,
    getMyApplications
};