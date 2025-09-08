// Components/Profile.js
import { useState, useEffect } from "react";
import "../css/Profile.css";

const Profile = ({ user, appointments, onProfileChange }) => {
    const [avatar, setAvatar] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [userData, setUserData] = useState({
        username: "",
        email: "",
        mobile: ""
    });

    // Load user data and avatar from localStorage on component mount
    useEffect(() => {
        if (user) {
            setUserData({
                username: user.username || "",
                email: user.email || "",
                mobile: user.mobile || ""
            });

            // Load avatar from localStorage if exists
            const savedAvatar = localStorage.getItem(`avatar_${user.id}`);
            if (savedAvatar) {
                setAvatar(savedAvatar);
            }
        }
    }, [user]);

    const handleAvatarChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                const avatarData = event.target.result;
                setAvatar(avatarData);
                // Save to localStorage
                localStorage.setItem(`avatar_${user.id}`, avatarData);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSave = () => {
        // Here you would typically send updated data to the backend
        setIsEditing(false);
        // For now, we'll just update localStorage
        localStorage.setItem(`user_${user.id}`, JSON.stringify({
            ...user,
            ...userData
        }));
    };

    const handleCancelEdit = () => {
        // Reset form data
        setUserData({
            username: user.username || "",
            email: user.email || "",
            mobile: user.mobile || ""
        });
        setIsEditing(false);
    };

    const formatDate = (dateString) => {
        const options = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    const handleDeleteAppointment = async (appointmentId) => {
        if (window.confirm("Are you sure you want to cancel this appointment?")) {
            try {
                const response = await fetch(`http://localhost:5000/api/appointments/user/${appointmentId}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ user_id: user.id })
                });

                if (response.ok) {
                    // Remove the appointment from the local state
                    const updatedAppointments = appointments.filter(app => app.id !== appointmentId);
                    onProfileChange(updatedAppointments);
                    alert("Appointment cancelled successfully!");
                } else {
                    alert("Failed to cancel appointment. Please try again.");
                }
            } catch (error) {
                console.error("Error deleting appointment:", error);
                alert("An error occurred while cancelling the appointment.");
            }
        }
    };

    if (!user) {
        return (
            <div className="profile-container">
                <div className="profile-login-prompt">
                    <h2>Please log in to view your profile</h2>
                    <p>You need to be logged in to access your personal information and appointments.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="profile-container">
            <div className="profile-header">
                <div className="profile-avatar-section">
                    <div className="avatar-container">
                        <img
                            src={avatar || `https://ui-avatars.com/api/?name=${user.username}&background=4e54c8&color=fff&size=128`}
                            alt="Profile Avatar"
                            className="profile-avatar"
                        />
                        <label htmlFor="avatar-upload" className="avatar-upload-label">
                            <i className="fas fa-camera"></i>
                            <input
                                id="avatar-upload"
                                type="file"
                                accept="image/*"
                                onChange={handleAvatarChange}
                                style={{ display: 'none' }}
                            />
                        </label>
                    </div>
                    <h2 className="profile-username">{user.username}</h2>
                    <p className="profile-email">{user.email}</p>
                </div>

                <div className="profile-actions">
                    {isEditing ? (
                        <div className="edit-actions">
                            <button className="btn-save" onClick={handleSave}>Save Changes</button>
                            <button className="btn-cancel" onClick={handleCancelEdit}>Cancel</button>
                        </div>
                    ) : (
                        <button className="btn-edit" onClick={() => setIsEditing(true)}>
                            <i className="fas fa-edit"></i> Edit Profile
                        </button>
                    )}
                </div>
            </div>

            <div className="profile-content">
                <div className="profile-details">
                    <h3>Account Information</h3>
                    <div className="details-grid">
                        <div className="detail-item">
                            <label>Username</label>
                            {isEditing ? (
                                <input
                                    type="text"
                                    name="username"
                                    value={userData.username}
                                    onChange={handleInputChange}
                                />
                            ) : (
                                <p>{userData.username}</p>
                            )}
                        </div>

                        <div className="detail-item">
                            <label>Email Address</label>
                            {isEditing ? (
                                <input
                                    type="email"
                                    name="email"
                                    value={userData.email}
                                    onChange={handleInputChange}
                                />
                            ) : (
                                <p>{userData.email}</p>
                            )}
                        </div>

                        <div className="detail-item">
                            <label>Mobile Number</label>
                            {isEditing ? (
                                <input
                                    type="tel"
                                    name="mobile"
                                    value={userData.mobile}
                                    onChange={handleInputChange}
                                    placeholder="Add your mobile number"
                                />
                            ) : (
                                <p>{userData.mobile || "Not provided"}</p>
                            )}
                        </div>

                        <div className="detail-item">
                            <label>Member Since</label>
                            <p>{new Date().toLocaleDateString()}</p>
                        </div>
                    </div>
                </div>

                <div className="appointments-section">
                    <h3>Your Appointments</h3>
                    {appointments.length === 0 ? (
                        <div className="no-appointments">
                            <i className="fas fa-calendar-plus"></i>
                            <p>You don't have any appointments yet.</p>
                            <a href="/Bookpage" className="btn-book">Book an Appointment</a>
                        </div>
                    ) : (
                        <div className="appointments-list">
                            {appointments.map(appointment => (
                                <div key={appointment.id} className="appointment-card">
                                    <div className="appointment-info">
                                        <div className="appointment-date">
                                            <i className="fas fa-calendar-alt"></i>
                                            <span>{formatDate(appointment.date)}</span>
                                        </div>
                                        <div className="appointment-mobile">
                                            <i className="fas fa-phone"></i>
                                            <span>{appointment.mobile_number}</span>
                                        </div>
                                    </div>
                                    <div className="appointment-actions">
                                        <button
                                            className="btn-cancel-appointment"
                                            onClick={() => handleDeleteAppointment(appointment.id)}
                                        >
                                            <i className="fas fa-times"></i> Cancel
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Profile;