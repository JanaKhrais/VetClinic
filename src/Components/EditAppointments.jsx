import { useState } from "react";
import "../css/EditAppointments.css"; // We'll create this CSS file





//appointment to edit
//onupdate function to save changes the parent component
//oncancel clos edit without saving
const EditAppointments = ({ appointment, onUpdate, onCancel }) => {
    const [formData, setFormData] = useState({//current appointment data
        mobile_number: appointment.mobile_number,
        date: formatDateForInput(appointment.date),
        time: formatTimeForInput(appointment.date)
    });

    // Helper function to format date for input[type="date"]
    function formatDateForInput(dateString) {
        const date = new Date(dateString);
        return date.toISOString().split('T')[0];
    }

    // Helper function to format time for input[type="time"]
    function formatTimeForInput(dateString) {
        const date = new Date(dateString);
        return date.toTimeString().substring(0, 5);
    }
    //update time, date
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.mobile_number || !formData.date || !formData.time) {
            alert("All fields are required");
            return;
        }

        // Combine date and time into a single datetime string
        const datetimeString = `${formData.date}T${formData.time}:00`;
        onUpdate({ ...appointment, ...formData, date: datetimeString });
        //parent component will update the backend and refresh the list.
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    return (
        <div className="edit-appointment-card">
            <h3>Edit Appointment</h3>
            <form onSubmit={handleSubmit} className="edit-appointment-form">
                <div className="form-group">
                    <label htmlFor="mobile_number">Phone Number</label>
                    <input
                        type="tel"
                        id="mobile_number"
                        name="mobile_number"
                        value={formData.mobile_number}
                        onChange={handleChange}
                        required
                        pattern="[0-9]{10}"
                        title="Please enter a 10-digit phone number"
                    />
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label htmlFor="date">Date</label>
                        <input
                            type="date"
                            id="date"
                            name="date"
                            value={formData.date}
                            onChange={handleChange}
                            required
                            min={new Date().toISOString().split('T')[0]}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="time">Time</label>
                        <input
                            type="time"
                            id="time"
                            name="time"
                            value={formData.time}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>

                <div className="form-actions">
                    <button type="submit" className="btn-save">
                        Save Changes
                    </button>
                    <button type="button" onClick={onCancel} className="btn-cancel">
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditAppointments;