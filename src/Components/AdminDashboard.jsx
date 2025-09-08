import React, { useEffect, useState } from "react";
import "../css/Admindasboard.css";

// Icons (you can replace with actual icon imports if using an icon library)
const CalendarIcon = () => (
    <svg className="detail-icon" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
    </svg>
);

const PhoneIcon = () => (
    <svg className="detail-icon" fill="currentColor" viewBox="0 0 20 20">
        <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
    </svg>
);

const UserIcon = () => (
    <svg className="detail-icon" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
    </svg>
);

const OrganizationIcon = () => (
    <svg className="detail-icon" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
    </svg>
);

const RefreshIcon = () => (
    <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
        <path d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z" />
        <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z" />
    </svg>
);

const CheckIcon = () => (
    <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
        <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z" />
    </svg>
);

const CloseIcon = () => (
    <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
    </svg>
);

const TrashIcon = () => (
    <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
        <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
    </svg>
);

const AdminDashboard = ({ user }) => {
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [stats, setStats] = useState({
        total: 0,
        pending: 0,
        approved: 0,
        declined: 0
    });

    // Fetch all appointments (admin only)
    const fetchAppointments = async () => {
        setLoading(true);
        setError("");
        try {
            const res = await fetch("http://localhost:5000/api/appointments", {
                headers: {
                    "Content-Type": "application/json",
                    "x-role": "admin", // send role to backend
                },
            });

            if (!res.ok) {
                throw new Error("Failed to fetch appointments");
            }

            const data = await res.json();
            setAppointments(data);

            // Calculate statistics
            const stats = {
                total: data.length,
                pending: data.filter(app => app.status === "pending").length,
                approved: data.filter(app => app.status === "approved").length,
                declined: data.filter(app => app.status === "declined").length
            };

            setStats(stats);
        } catch (err) {
            console.error(err);
            setError(err.message || "Error fetching appointments");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAppointments();
    }, []);

    // Update status: approve / decline
    const updateStatus = async (id, status) => {
        try {
            const res = await fetch(`http://localhost:5000/api/appointments/${id}/status`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "x-role": "admin",
                },
                body: JSON.stringify({ status }),
            });

            if (!res.ok) throw new Error("Failed to update status");

            const updated = await res.json();
            setAppointments((prev) => prev.map((app) => (app.id === id ? updated : app)));

            // Update stats
            fetchAppointments();
        } catch (err) {
            console.error(err);
            alert("Failed to update status");
        }
    };

    // Delete appointment
    const deleteAppointment = async (id) => {
        if (!window.confirm("Are you sure you want to delete this appointment?")) return;

        try {
            const res = await fetch(`http://localhost:5000/api/appointments/${id}`, {
                method: "DELETE",
                headers: { "x-role": "admin" },
            });

            if (!res.ok) throw new Error("Failed to delete appointment");

            setAppointments((prev) => prev.filter((app) => app.id !== id));

            // Update stats
            fetchAppointments();
        } catch (err) {
            console.error(err);
            alert("Failed to delete appointment");
        }
    };

    // Filter appointments based on status
    const filteredAppointments = statusFilter === "all"
        ? appointments
        : appointments.filter(app => app.status === statusFilter);

    return (
        <div className="admin-dashboard">
            <div className="dashboard-header">
                <h1 className="dashboard-title">Admin Dashboard</h1>
                <div className="dashboard-controls">
                    <button className="refresh-btn" onClick={fetchAppointments}>
                        <RefreshIcon /> Refresh
                    </button>
                </div>
            </div>

            {/* Statistics Cards */}
            <div className="stats-container">
                <div className="stat-card">
                    <p className="stat-title">Total Appointments</p>
                    <h3 className="stat-value">{stats.total}</h3>
                </div>
                <div className="stat-card">
                    <p className="stat-title">Pending</p>
                    <h3 className="stat-value">{stats.pending}</h3>
                </div>
                <div className="stat-card">
                    <p className="stat-title">Approved</p>
                    <h3 className="stat-value">{stats.approved}</h3>
                </div>
                <div className="stat-card">
                    <p className="stat-title">Declined</p>
                    <h3 className="stat-value">{stats.declined}</h3>
                </div>
            </div>

            {/* Appointments Section */}
            <div className="appointments-container">
                <div className="section-header">
                    <h2 className="section-title">Appointment Requests</h2>
                    <div className="filter-controls">
                        <select
                            className="filter-select"
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                        >
                            <option value="all">All Statuses</option>
                            <option value="pending">Pending</option>
                            <option value="approved">Approved</option>
                            <option value="declined">Declined</option>
                        </select>
                    </div>
                </div>

                {loading && <p className="loading">Loading appointments...</p>}
                {error && <p className="error">{error}</p>}

                {!loading && filteredAppointments.length === 0 && (
                    <p className="empty-state">No appointments found.</p>
                )}

                <div className="appointments-grid">
                    {filteredAppointments.map((appointment) => (
                        <div
                            key={appointment.id}
                            className={`appointment-card ${appointment.status}`}
                        >
                            <div className="card-header">
                                <div className="user-info">
                                    <h3 className="user-name">{appointment.username}</h3>
                                    <p className="user-contact">{appointment.email}</p>
                                </div>
                                <span className={`status-badge ${appointment.status}`}>
                                    {appointment.status}
                                </span>
                            </div>

                            <div className="appointment-details">
                                <div className="detail-item highlighted">
                                    <PhoneIcon />
                                    <span className="detail-value">{appointment.mobile_number}</span>
                                </div>
                                <div className="detail-item highlighted">
                                    <CalendarIcon />
                                    <span className="detail-value">{new Date(appointment.date).toLocaleDateString('en-US', {
                                        weekday: 'short',
                                        year: 'numeric',
                                        month: 'short',
                                        day: 'numeric',
                                        hour: '2-digit',
                                        minute: '2-digit'
                                    })}</span>
                                </div>
                                {appointment.organization && (
                                    <div className="detail-item highlighted">
                                        <OrganizationIcon />
                                        <span className="detail-value">{appointment.organization}</span>
                                    </div>
                                )}
                            </div>

                            <div className="appointment-actions">
                                {appointment.status !== "approved" && (
                                    <button
                                        onClick={() => updateStatus(appointment.id, "approved")}
                                        className="action-btn btn-approve"
                                    >
                                        <CheckIcon /> Approve
                                    </button>
                                )}
                                {appointment.status !== "declined" && (
                                    <button
                                        onClick={() => updateStatus(appointment.id, "declined")}
                                        className="action-btn btn-decline"
                                    >
                                        <CloseIcon /> Decline
                                    </button>
                                )}
                                <button
                                    onClick={() => deleteAppointment(appointment.id)}
                                    className="action-btn btn-delete"
                                >
                                    <TrashIcon /> Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;