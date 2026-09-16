const Project = require("../models/Project");

// Create a new project
const createProject = async (req, res) => {
    try {
        const {
            title,
            description,
            skills,
            budget,
            deadline
        } = req.body;

        if (!title || !description || !budget || !deadline) {
            return res.status(400).json({
                message: "Please provide all required fields"
            });
        }

        const project = await Project.create({
            title,
            description,
            skills,
            budget,
            deadline,
            client: req.user.id
        });

        res.status(201).json({
            message: "Project created successfully",
            project
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to create project",
            error: error.message
        });
    }
};


// Get all projects
const getAllProjects = async (req, res) => {
    try {
        const projects = await Project.find()
            .populate("client", "name email")
            .sort({ createdAt: -1 });

        res.status(200).json({
            message: "Projects fetched successfully",
            projects
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch projects",
            error: error.message
        });
    }
};
// Search and filter projects
const searchProjects = async (req, res) => {
    try {
        const {
            search,
            skill,
            minBudget,
            maxBudget,
            status
        } = req.query;

        let filter = {};

        // Search by title
        if (search) {
            filter.title = {
                $regex: search,
                $options: "i"
            };
        }

        // Filter by skill
        if (skill) {
            filter.skills = {
                $regex: skill,
                $options: "i"
            };
        }

        // Filter by budget
        if (minBudget || maxBudget) {
            filter.budget = {};

            if (minBudget) {
                filter.budget.$gte = Number(minBudget);
            }

            if (maxBudget) {
                filter.budget.$lte = Number(maxBudget);
            }
        }

        // Filter by status
        if (status) {
            filter.status = status;
        }

        const projects = await Project.find(filter)
            .populate("client", "name email")
            .sort({ createdAt: -1 });

        res.status(200).json({
            message: "Projects fetched successfully",
            count: projects.length,
            projects
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to search projects",
            error: error.message
        });
    }
};


// Mark project as Completed
const completeProject = async (req, res) => {
    try {
        const { projectId } = req.params;

        const project = await Project.findById(projectId);

        if (!project) {
            return res.status(404).json({
                message: "Project not found"
            });
        }

        // Only project owner/client can complete it
        if (project.client.toString() !== req.user.id) {
            return res.status(403).json({
                message: "You can only complete your own project"
            });
        }

        // Project must be In Progress
        if (project.status !== "In Progress") {
            return res.status(400).json({
                message: "Only In Progress projects can be completed"
            });
        }

        project.status = "Completed";

        await project.save();

        res.status(200).json({
            message: "Project marked as completed successfully",
            project
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to complete project",
            error: error.message
        });
    }
};


// Get client's own projects
const getMyProjects = async (req, res) => {
    try {
        const projects = await Project.find({
            client: req.user.id
        })
            .populate("client", "name email")
            .sort({ createdAt: -1 });

        res.status(200).json({
            message: "Your projects fetched successfully",
            projects
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch your projects",
            error: error.message
        });
    }
};


module.exports = {
    createProject,
    getAllProjects,
    completeProject,
    getMyProjects,
     searchProjects
};