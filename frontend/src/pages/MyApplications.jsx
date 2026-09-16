import React, { useEffect, useState } from "react";
import API from "../services/api";

function MyApplications() {
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const fetchApplications = async () => {
        try {
            const response = await API.get(
                "/applications/my-applications"
            );

            setApplications(response.data.applications);
        } catch (error) {
            console.log("APPLICATION ERROR:", error);

            setError(
                error.response?.data?.message ||
                "Failed to load applications"
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchApplications();
    }, []);

    const getStatusClass = (status) => {
        return status.toLowerCase();
    };

    return (
        <div className="applications-page">

            <div className="page-header">
                <div>
                    <h1>My Applications</h1>

                    <p>
                        Track the projects you have applied for
                    </p>
                </div>
            </div>

            <hr />

            {loading && (
                <div className="empty-box">
                    <p>Loading applications...</p>
                </div>
            )}

            {error && (
                <p className="error-message">
                    {error}
                </p>
            )}

            {!loading &&
                !error &&
                applications.length === 0 && (
                    <div className="empty-box">
                        <h3>No Applications Yet</h3>

                        <p>
                            You haven't applied to any projects yet.
                        </p>
                    </div>
                )}

            <div className="applications-grid">

                {!loading &&
                    !error &&
                    applications.map((application) => (

                        <div
                            className="my-application-card"
                            key={application._id}
                        >

                            <div className="application-header">

                                <h2>
                                    {application.project?.title}
                                </h2>

                                <span
                                    className={`application-status ${getStatusClass(
                                        application.status
                                    )}`}
                                >
                                    {application.status}
                                </span>

                            </div>

                            <p className="application-description">
                                {application.project?.description}
                            </p>

                            <div className="application-details">

                                <div>
                                    <span>My Bid</span>
                                    <strong>
                                        ₹{application.bidAmount}
                                    </strong>
                                </div>

                                <div>
                                    <span>Project Budget</span>
                                    <strong>
                                        ₹{application.project?.budget}
                                    </strong>
                                </div>

                                <div>
                                    <span>Project Status</span>
                                    <strong>
                                        {application.project?.status}
                                    </strong>
                                </div>

                                <div>
                                    <span>Deadline</span>
                                    <strong>
                                        {application.project?.deadline
                                            ? new Date(
                                                  application.project.deadline
                                              ).toLocaleDateString()
                                            : "N/A"}
                                    </strong>
                                </div>

                            </div>

                            <div className="proposal-box">

                                <h3>Your Proposal</h3>

                                <p>
                                    {application.proposal}
                                </p>

                            </div>

                        </div>

                    ))}

            </div>

        </div>
    );
}

export default MyApplications;