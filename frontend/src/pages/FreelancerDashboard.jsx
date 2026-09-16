import React, { useEffect, useState } from "react";
import API from "../services/api";

function FreelancerDashboard() {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [selectedProject, setSelectedProject] = useState(null);
    const [proposal, setProposal] = useState("");
    const [bidAmount, setBidAmount] = useState("");
    const [message, setMessage] = useState("");
    const [submitting, setSubmitting] = useState(false);

    const fetchProjects = async () => {
        try {
            const response = await API.get("/projects");
            setProjects(response.data.projects);
        } catch (error) {
            console.log("PROJECT ERROR:", error);

            setError(
                error.response?.data?.message ||
                "Failed to load projects"
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProjects();
    }, []);

    const handleApply = (project) => {
        setSelectedProject(project);
        setProposal("");
        setBidAmount("");
        setMessage("");
    };

    const submitApplication = async (e) => {
        e.preventDefault();

        setMessage("");
        setSubmitting(true);

        try {
            const response = await API.post(
                "/applications/apply",
                {
                    projectId: selectedProject._id,
                    proposal,
                    bidAmount: Number(bidAmount)
                }
            );

            setMessage(
                response.data.message ||
                "Application submitted successfully"
            );

            setProposal("");
            setBidAmount("");

        } catch (error) {
            console.log("APPLICATION ERROR:", error);

            setMessage(
                error.response?.data?.message ||
                "Failed to submit application"
            );
        } finally {
            setSubmitting(false);
        }
    };

    const closeApplicationForm = () => {
        setSelectedProject(null);
        setProposal("");
        setBidAmount("");
        setMessage("");
    };

    return (
        <div className="freelancer-dashboard">

            {/* HEADER */}

            <div className="dashboard-header">
                <div>
                    <h1>Freelancer Dashboard</h1>

                    <p>
                        Find projects and submit your proposals
                    </p>
                </div>
            </div>

            <hr />

            <h2 className="section-title">
                Available Projects
            </h2>

            {loading && (
                <div className="loading-box">
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
                        <h3>No projects available</h3>
                        <p>
                            Check back later for new projects.
                        </p>
                    </div>
                )}

            {/* PROJECTS */}

            <div className="projects-grid">

                {!loading &&
                    !error &&
                    projects.map((project) => (

                        <div
                            className="project-card"
                            key={project._id}
                        >

                            <div className="project-card-header">
                                <h3>{project.title}</h3>

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
                                    <strong>Budget</strong>
                                    <span>
                                        ₹{project.budget}
                                    </span>
                                </div>

                                <div>
                                    <strong>Deadline</strong>
                                    <span>
                                        {new Date(
                                            project.deadline
                                        ).toLocaleDateString()}
                                    </span>
                                </div>

                            </div>

                            <div className="skills-section">

                                <strong>Required Skills</strong>

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

                            {project.status === "Open" && (

                                <button
                                    className="apply-btn"
                                    onClick={() =>
                                        handleApply(project)
                                    }
                                >
                                    Apply Now
                                </button>

                            )}

                        </div>

                    ))}

            </div>

            {/* APPLICATION FORM */}

            {selectedProject && (

                <div className="application-form-section">

                    <div className="application-form-card">

                        <div className="form-header">

                            <div>
                                <h2>
                                    Submit Your Proposal
                                </h2>

                                <p>
                                    Applying for:{" "}
                                    <strong>
                                        {selectedProject.title}
                                    </strong>
                                </p>
                            </div>

                            <button
                                className="close-btn"
                                type="button"
                                onClick={closeApplicationForm}
                            >
                                ×
                            </button>

                        </div>

                        {message && (
                            <p
                                className={
                                    message.includes("successfully")
                                        ? "success-message"
                                        : "error-message"
                                }
                            >
                                {message}
                            </p>
                        )}

                        <form onSubmit={submitApplication}>

                            <div className="form-group">

                                <label>
                                    Your Proposal
                                </label>

                                <textarea
                                    rows="6"
                                    placeholder="Explain why you are suitable for this project..."
                                    value={proposal}
                                    onChange={(e) =>
                                        setProposal(
                                            e.target.value
                                        )
                                    }
                                    required
                                />

                            </div>

                            <div className="form-group">

                                <label>
                                    Your Bid Amount (₹)
                                </label>

                                <input
                                    type="number"
                                    min="1"
                                    placeholder="Enter your bid amount"
                                    value={bidAmount}
                                    onChange={(e) =>
                                        setBidAmount(
                                            e.target.value
                                        )
                                    }
                                    required
                                />

                            </div>

                            <div className="form-buttons">

                                <button
                                    type="submit"
                                    disabled={submitting}
                                >
                                    {submitting
                                        ? "Submitting..."
                                        : "Submit Application"}
                                </button>

                                <button
                                    type="button"
                                    className="cancel-btn"
                                    onClick={
                                        closeApplicationForm
                                    }
                                >
                                    Cancel
                                </button>

                            </div>

                        </form>

                    </div>

                </div>

            )}

        </div>
    );
}

export default FreelancerDashboard;