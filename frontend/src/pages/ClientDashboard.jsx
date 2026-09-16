import React, { useEffect, useState } from "react";
import API from "../services/api";

function ClientDashboard() {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [showCreateForm, setShowCreateForm] = useState(false);

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [skills, setSkills] = useState("");
    const [budget, setBudget] = useState("");
    const [deadline, setDeadline] = useState("");

    const [createMessage, setCreateMessage] = useState("");
    const [createError, setCreateError] = useState("");
    const [creating, setCreating] = useState(false);

    const [selectedProject, setSelectedProject] = useState(null);
    const [applications, setApplications] = useState([]);
    const [applicationsLoading, setApplicationsLoading] = useState(false);
    const [applicationsError, setApplicationsError] = useState("");
    const [actionMessage, setActionMessage] = useState("");

    const fetchMyProjects = async () => {
        try {
            const response = await API.get("/projects/my-projects");
            setProjects(response.data.projects);
        } catch (error) {
            console.log("MY PROJECTS ERROR:", error);

            setError(
                error.response?.data?.message ||
                "Failed to load your projects"
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMyProjects();
    }, []);

    // CREATE PROJECT
    const handleCreateProject = async (e) => {
        e.preventDefault();

        setCreateMessage("");
        setCreateError("");
        setCreating(true);

        try {
            const skillsArray = skills
                .split(",")
                .map((skill) => skill.trim())
                .filter((skill) => skill !== "");

            const response = await API.post("/projects", {
                title,
                description,
                skills: skillsArray,
                budget: Number(budget),
                deadline
            });

            setCreateMessage(
                response.data.message ||
                "Project created successfully"
            );

            setTitle("");
            setDescription("");
            setSkills("");
            setBudget("");
            setDeadline("");

            await fetchMyProjects();

        } catch (error) {
            console.log("CREATE PROJECT ERROR:", error);

            setCreateError(
                error.response?.data?.message ||
                "Failed to create project"
            );
        } finally {
            setCreating(false);
        }
    };

    // VIEW APPLICATIONS
    const viewApplications = async (project) => {
        setSelectedProject(project);
        setApplications([]);
        setApplicationsError("");
        setActionMessage("");
        setApplicationsLoading(true);

        try {
            const response = await API.get(
                `/applications/project/${project._id}`
            );

            setApplications(response.data.applications);

        } catch (error) {
            console.log("APPLICATIONS ERROR:", error);

            setApplicationsError(
                error.response?.data?.message ||
                "Failed to load applications"
            );
        } finally {
            setApplicationsLoading(false);
        }
    };

    // ACCEPT / REJECT
    const updateApplicationStatus = async (
        applicationId,
        status
    ) => {
        try {
            const response = await API.put(
                `/applications/${applicationId}/status`,
                { status }
            );

            setActionMessage(
                response.data.message ||
                `Application ${status.toLowerCase()} successfully`
            );

            if (selectedProject) {
                const applicationsResponse = await API.get(
                    `/applications/project/${selectedProject._id}`
                );

                setApplications(
                    applicationsResponse.data.applications
                );
            }

            await fetchMyProjects();

        } catch (error) {
            console.log("STATUS UPDATE ERROR:", error);

            setActionMessage(
                error.response?.data?.message ||
                "Failed to update application status"
            );
        }
    };

    // COMPLETE PROJECT
    const completeProject = async (projectId) => {
        try {
            const response = await API.put(
                `/projects/${projectId}/complete`
            );

            alert(
                response.data.message ||
                "Project completed successfully"
            );

            await fetchMyProjects();

            if (selectedProject?._id === projectId) {
                setSelectedProject(null);
            }

        } catch (error) {
            console.log("COMPLETE PROJECT ERROR:", error);

            alert(
                error.response?.data?.message ||
                "Failed to complete project"
            );
        }
    };

    return (
        <div className="client-dashboard">

            {/* HEADER */}

            <div className="dashboard-header">

                <div>
                    <h1>Client Dashboard</h1>

                    <p>
                        Manage your projects and find skilled freelancers
                    </p>
                </div>

                <button
                    className="create-project-btn"
                    onClick={() => {
                        setShowCreateForm(!showCreateForm);
                        setCreateMessage("");
                        setCreateError("");
                    }}
                >
                    {showCreateForm
                        ? "Close Form"
                        : "+ Create Project"}
                </button>

            </div>

            {/* CREATE PROJECT */}

            {showCreateForm && (

                <div className="create-project-card">

                    <h2>Create New Project</h2>

                    <p className="form-subtitle">
                        Post your project and receive proposals
                        from freelancers.
                    </p>

                    {createMessage && (
                        <p className="success-message">
                            {createMessage}
                        </p>
                    )}

                    {createError && (
                        <p className="error-message">
                            {createError}
                        </p>
                    )}

                    <form onSubmit={handleCreateProject}>

                        <div className="form-group">
                            <label>Project Title</label>

                            <input
                                type="text"
                                placeholder="e.g. Build E-commerce Website"
                                value={title}
                                onChange={(e) =>
                                    setTitle(e.target.value)
                                }
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Description</label>

                            <textarea
                                rows="5"
                                placeholder="Describe what you need..."
                                value={description}
                                onChange={(e) =>
                                    setDescription(e.target.value)
                                }
                                required
                            />
                        </div>

                        <div className="form-row">

                            <div className="form-group">
                                <label>Required Skills</label>

                                <input
                                    type="text"
                                    placeholder="React, Node.js, MongoDB"
                                    value={skills}
                                    onChange={(e) =>
                                        setSkills(e.target.value)
                                    }
                                    required
                                />

                                <small>
                                    Separate skills with commas
                                </small>
                            </div>

                            <div className="form-group">
                                <label>Budget (₹)</label>

                                <input
                                    type="number"
                                    min="1"
                                    placeholder="25000"
                                    value={budget}
                                    onChange={(e) =>
                                        setBudget(e.target.value)
                                    }
                                    required
                                />
                            </div>

                        </div>

                        <div className="form-group">
                            <label>Deadline</label>

                            <input
                                type="date"
                                value={deadline}
                                onChange={(e) =>
                                    setDeadline(e.target.value)
                                }
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={creating}
                        >
                            {creating
                                ? "Creating Project..."
                                : "Create Project"}
                        </button>

                    </form>

                </div>

            )}

            <hr />

            {/* PROJECTS */}

            <div className="section-heading">

                <div>
                    <h2>My Projects</h2>
                    <p>
                        Projects created by you
                    </p>
                </div>

                <span className="project-count">
                    {projects.length} Projects
                </span>

            </div>

            {loading && (
                <div className="empty-box">
                    <p>Loading projects...</p>
                </div>
            )}

            {error && (
                <p className="error-message">
                    {error}
                </p>
            )}

            {!loading &&
                !error &&
                projects.length === 0 && (

                    <div className="empty-box">
                        <h3>No Projects Yet</h3>

                        <p>
                            Create your first project to get started.
                        </p>
                    </div>

                )}

            <div className="projects-grid">

                {!loading &&
                    !error &&
                    projects.map((project) => (

                        <div
                            className="project-card"
                            key={project._id}
                        >

                            <div className="project-card-header">

                                <h3>
                                    {project.title}
                                </h3>

                                <span
                                    className={`status-badge ${
                                        project.status
                                            .toLowerCase()
                                            .replace(" ", "-")
                                    }`}
                                >
                                    {project.status}
                                </span>

                            </div>

                            <p className="project-description">
                                {project.description}
                            </p>

                            <div className="project-info">

                                <div>
                                    <span>Budget</span>

                                    <strong>
                                        ₹{project.budget}
                                    </strong>
                                </div>

                                <div>
                                    <span>Deadline</span>

                                    <strong>
                                        {new Date(
                                            project.deadline
                                        ).toLocaleDateString()}
                                    </strong>
                                </div>

                            </div>

                            <div className="skills-section">

                                <strong>
                                    Required Skills
                                </strong>

                                <div className="skills-list">

                                    {project.skills?.map(
                                        (skill, index) => (

                                            <span
                                                className="skill-tag"
                                                key={index}
                                            >
                                                {skill}
                                            </span>

                                        )
                                    )}

                                </div>

                            </div>

                            <div className="project-actions">

                                <button
                                    onClick={() =>
                                        viewApplications(project)
                                    }
                                >
                                    View Applications
                                </button>

                                {project.status === "In Progress" && (

                                    <button
                                        className="complete-btn"
                                        onClick={() =>
                                            completeProject(
                                                project._id
                                            )
                                        }
                                    >
                                        Mark as Completed
                                    </button>

                                )}

                            </div>

                        </div>

                    ))}

            </div>

            {/* APPLICATIONS */}

            {selectedProject && (

                <div className="applications-section">

                    <div className="applications-header">

                        <div>
                            <h2>
                                Applications
                            </h2>

                            <p>
                                {selectedProject.title}
                            </p>
                        </div>

                        <button
                            className="close-btn"
                            onClick={() =>
                                setSelectedProject(null)
                            }
                        >
                            ×
                        </button>

                    </div>

                    {actionMessage && (
                        <p className="success-message">
                            {actionMessage}
                        </p>
                    )}

                    {applicationsLoading && (
                        <p>Loading applications...</p>
                    )}

                    {applicationsError && (
                        <p className="error-message">
                            {applicationsError}
                        </p>
                    )}

                    {!applicationsLoading &&
                        !applicationsError &&
                        applications.length === 0 && (

                            <div className="empty-box">
                                <h3>No Applications</h3>

                                <p>
                                    No freelancers have applied
                                    yet.
                                </p>
                            </div>

                        )}

                    {!applicationsLoading &&
                        !applicationsError &&
                        applications.map((application) => (

                            <div
                                className="application-card"
                                key={application._id}
                            >

                                <div className="application-header">

                                    <div>
                                        <h3>
                                            {application.freelancer?.name}
                                        </h3>

                                        <p>
                                            {application.freelancer?.email}
                                        </p>
                                    </div>

                                    <span
                                        className={`application-status ${application.status.toLowerCase()}`}
                                    >
                                        {application.status}
                                    </span>

                                </div>

                                <p>
                                    <strong>Skills:</strong>{" "}
                                    {application.freelancer?.skills?.join(
                                        ", "
                                    ) || "Not provided"}
                                </p>

                                <p>
                                    <strong>Bio:</strong>{" "}
                                    {application.freelancer?.bio ||
                                        "No bio provided"}
                                </p>

                                <div className="proposal-box">

                                    <h4>
                                        Freelancer Proposal
                                    </h4>

                                    <p>
                                        {application.proposal}
                                    </p>

                                </div>

                                <div className="bid-info">

                                    <span>
                                        Bid Amount
                                    </span>

                                    <strong>
                                        ₹{application.bidAmount}
                                    </strong>

                                </div>

                                {application.status === "Pending" && (

                                    <div className="application-actions">

                                        <button
                                            className="accept-btn"
                                            onClick={() =>
                                                updateApplicationStatus(
                                                    application._id,
                                                    "Accepted"
                                                )
                                            }
                                        >
                                            Accept
                                        </button>

                                        <button
                                            className="reject-btn"
                                            onClick={() =>
                                                updateApplicationStatus(
                                                    application._id,
                                                    "Rejected"
                                                )
                                            }
                                        >
                                            Reject
                                        </button>

                                    </div>

                                )}

                            </div>

                        ))}

                </div>

            )}

        </div>
    );
}

export default ClientDashboard;