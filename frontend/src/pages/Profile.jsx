import React, { useEffect, useState } from "react";
import API from "../services/api";

function Profile() {
    const [profile, setProfile] = useState(null);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("");
    const [bio, setBio] = useState("");
    const [skills, setSkills] = useState("");

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const fetchProfile = async () => {
        try {
            const response = await API.get("/auth/profile");

            const user = response.data.user;

            setProfile(user);
            setName(user.name || "");
            setEmail(user.email || "");
            setRole(user.role || "");
            setBio(user.bio || "");
            setSkills(user.skills?.join(", ") || "");

        } catch (error) {
            console.log("PROFILE ERROR:", error);

            setError(
                error.response?.data?.message ||
                "Failed to load profile"
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProfile();
    }, []);

    const handleUpdate = async (e) => {
        e.preventDefault();

        setMessage("");
        setError("");
        setSaving(true);

        try {
            const skillsArray = skills
                .split(",")
                .map((skill) => skill.trim())
                .filter((skill) => skill !== "");

            const response = await API.put("/auth/profile", {
                name,
                bio,
                skills: skillsArray
            });

            const updatedUser = response.data.user;

            setProfile(updatedUser);
            setName(updatedUser.name || "");
            setEmail(updatedUser.email || "");
            setRole(updatedUser.role || "");
            setBio(updatedUser.bio || "");
            setSkills(updatedUser.skills?.join(", ") || "");

            localStorage.setItem(
                "user",
                JSON.stringify({
                    id: updatedUser.id,
                    name: updatedUser.name,
                    email: updatedUser.email,
                    role: updatedUser.role
                })
            );

            setMessage(
                response.data.message ||
                "Profile updated successfully"
            );

        } catch (error) {
            console.log("UPDATE PROFILE ERROR:", error);

            setError(
                error.response?.data?.message ||
                "Failed to update profile"
            );
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="profile-container">
                <p>Loading profile...</p>
            </div>
        );
    }

    return (
        <div className="profile-container">

            <div className="profile-card">

                <h1>My Profile</h1>

                <p className="profile-subtitle">
                    Manage your account information
                </p>

                {message && (
                    <p className="success-message">
                        {message}
                    </p>
                )}

                {error && (
                    <p className="error-message">
                        {error}
                    </p>
                )}

                <form onSubmit={handleUpdate}>

                    <div className="form-group">
                        <label>Name</label>

                        <input
                            type="text"
                            value={name}
                            onChange={(e) =>
                                setName(e.target.value)
                            }
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Email</label>

                        <input
                            type="email"
                            value={email}
                            disabled
                        />
                    </div>

                    <div className="form-group">
                        <label>Account Type</label>

                        <input
                            type="text"
                            value={role}
                            disabled
                        />
                    </div>

                    <div className="form-group">
                        <label>Skills</label>

                        <input
                            type="text"
                            placeholder="Example: React, Node.js, MongoDB"
                            value={skills}
                            onChange={(e) =>
                                setSkills(e.target.value)
                            }
                        />

                        <small>
                            Separate skills using commas
                        </small>
                    </div>

                    <div className="form-group">
                        <label>Bio</label>

                        <textarea
                            rows="5"
                            placeholder="Write something about yourself..."
                            value={bio}
                            onChange={(e) =>
                                setBio(e.target.value)
                            }
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={saving}
                    >
                        {saving
                            ? "Saving..."
                            : "Update Profile"}
                    </button>

                </form>

            </div>

        </div>
    );
}

export default Profile;