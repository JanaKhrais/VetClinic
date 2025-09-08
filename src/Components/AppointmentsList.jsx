import { useEffect, useState } from "react";
import Bookpage from "./Bookpage";
import EditAppointments from "./EditAppointments";
import "../css/AppointmentList.css";

const AppointmentsList = ({ user, onProfileChange }) => {
    const [appointments, setAppointments] = useState([]);
    const [editingAppointmentId, setEditingAppointmentId] = useState(null);
    const [loading, setLoading] = useState(true);
    const [deleteConfirmId, setDeleteConfirmId] = useState(null);

    const isAdmin = user?.role === "admin";

    useEffect(() => {
        if (user) fetchAppointments();
        else setLoading(false);
    }, [user]);

    const fetchAppointments = async () => {
        if (!user) return;
        setLoading(true);
        try {
            const res = await fetch(
                `http://localhost:5000/api/appointments/user/${user.id}`
            );
            const data = await res.json();
            setAppointments(data);
        } catch (err) {
            console.error("Error fetching appointments:", err);
        } finally {
            setLoading(false);
        }
    };

    const addAppointment = async (appointment) => {
        if (!user) return alert("Login first please");
        try {
            const res = await fetch("http://localhost:5000/api/appointments/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "x-role": user.role,
                },
                body: JSON.stringify({ ...appointment, user_id: user.id }),
            });
            await res.json();
            fetchAppointments();
        } catch (err) {
            console.error("Error adding appointment:", err);
        }
    };

    const updateAppointment = async (appointment) => {
        try {
            const res = await fetch(
                `http://localhost:5000/api/appointments/${appointment.id}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        "x-role": user.role,
                    },
                    body: JSON.stringify({
                        mobile_number: appointment.mobile_number,
                        date: appointment.date,
                    }),
                }
            );

            if (!res.ok) {
                const text = await res.text();
                console.error("Server returned:", text);
                alert("Failed to update appointment. Check console.");
                return;
            }

            await res.json();
            setEditingAppointmentId(null);
            fetchAppointments();
        } catch (err) {
            console.error("Error updating appointment:", err);
        }
    };

    const deleteAppointment = async (appointment) => {
        try {
            let url = `http://localhost:5000/api/appointments/${appointment.id}`;
            let options = {
                method: "DELETE",
                headers: {},
            };

            if (isAdmin) {
                options.headers["x-role"] = "admin"; // Admin can delete any
            } else {
                // Regular user can only delete their own
                url = `http://localhost:5000/api/appointments/user/${appointment.id}`;
                options.headers["Content-Type"] = "application/json";
                options.body = JSON.stringify({ user_id: user.id });
            }

            const res = await fetch(url, options);
            if (!res.ok) {
                const text = await res.text();
                console.error("Delete failed:", text);
                alert("Failed to delete appointment. Check console.");
                return;
            }

            setDeleteConfirmId(null);
            fetchAppointments();
        } catch (err) {
            console.error("Error deleting appointment:", err);
        }
    };

    const formatDate = (dateString) => {
        const options = {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    const isUpcoming = (dateString) => new Date(dateString) > new Date();

    return (
        <div className="appointments-container">
            <div className="appointments-header">
                <h2>My Appointments</h2>
                {isAdmin && <Bookpage onAdd={addAppointment} />}
            </div>

            {loading ? (
                <div className="loading-spinner">
                    <div className="spinner"></div>
                    <p>Loading appointments...</p>
                </div>
            ) : appointments.length === 0 ? (
                <div className="empty-state">
                    <div className="empty-icon">📅</div>
                    <h3>No appointments yet</h3>
                    <p>Schedule your first appointment to get started</p>
                </div>
            ) : (
                <div className="appointments-grid">
                    {appointments.map((appointment) => (
                        <div
                            key={appointment.id}
                            className={`appointment-card ${isUpcoming(appointment.date) ? "upcoming" : "past"
                                }`}
                        >
                            {editingAppointmentId === appointment.id ? (
                                <EditAppointments
                                    appointment={appointment}
                                    onUpdate={updateAppointment}
                                    onCancel={() => setEditingAppointmentId(null)}
                                />
                            ) : (
                                <>
                                    <div className="appointment-status">
                                        <span
                                            className={`status-badge ${isUpcoming(appointment.date) ? "upcoming" : "past"
                                                }`}
                                        >
                                            {isUpcoming(appointment.date) ? "Upcoming" : "Past"}
                                        </span>
                                    </div>

                                    <div className="appointment-info">
                                        <div className="appointment-detail">
                                            <span className="detail-label">Phone:</span>
                                            <span className="detail-value">
                                                {appointment.mobile_number}
                                            </span>
                                        </div>
                                        <div className="appointment-detail">
                                            <span className="detail-label">Date & Time:</span>
                                            <span className="detail-value">
                                                {formatDate(appointment.date)}
                                            </span>
                                        </div>
                                        <div className="appointment-detail">
                                            <span className="detail-label">Status:</span>
                                            <span className={`status-badge ${appointment.status}`}>
                                                {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="appointment-actions">
                                        <button
                                            className="btn-edit"
                                            onClick={() => setEditingAppointmentId(appointment.id)}
                                        >
                                            Edit
                                        </button>

                                        {(isAdmin || appointment.user_id === user.id) && (
                                            <>
                                                {deleteConfirmId === appointment.id ? (
                                                    <div className="delete-confirmation">
                                                        <span>Are you sure?</span>
                                                        <button
                                                            className="btn-confirm-delete"
                                                            onClick={() => deleteAppointment(appointment)}
                                                        >
                                                            Yes
                                                        </button>
                                                        <button
                                                            className="btn-cancel-delete"
                                                            onClick={() => setDeleteConfirmId(null)}
                                                        >
                                                            No
                                                        </button>
                                                    </div>
                                                ) : (
                                                    <button
                                                        className="btn-delete"
                                                        onClick={() => setDeleteConfirmId(appointment.id)}
                                                    >
                                                        Delete
                                                    </button>
                                                )}
                                            </>
                                        )}
                                    </div>
                                </>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default AppointmentsList;