import React, { useState, useEffect } from "react";
import "../css/bookpage.css";


//onAdd unction called after book successfuly
const Bookpage = ({ onAdd = () => { }, user }) => {
    const [formData, setFormData] = useState({
        mobile_number: "",
        date: "",
        time: "09:00"
    });//holds the inputs
    const [isSubmitting, setIsSubmitting] = useState(false);//loading state
    const [availableTimeSlots, setAvailableTimeSlots] = useState([]);//array for rime

    // Generate time slots from 9 AM to 5 PM
    useEffect(() => {
        const slots = [];
        for (let hour = 9; hour <= 17; hour++) {
            for (let minute = 0; minute < 60; minute += 30) {
                const time = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
                slots.push(time);
            }
        }
        setAvailableTimeSlots(slots);
    }, []);
    //send appointment ot the backend
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!user) return alert("Please login first!");

        setIsSubmitting(true);

        const newAppointment = {
            user_id: user.id,
            mobile_number: formData.mobile_number,
            date: `${formData.date}T${formData.time}:00.000Z`,
        };

        try {
            const res = await fetch("http://localhost:5000/api/appointments/", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newAppointment),
            });

            if (!res.ok) throw new Error("Failed to book appointment");

            const data = await res.json();

            // Call onAdd safely (default empty function ensures no error)
            onAdd(data);
            //call it so a new appointment is created
            setFormData({ mobile_number: "", date: "", time: "09:00" });

            // Show success message
            document.querySelector('.success-message').style.display = 'block';
            setTimeout(() => {
                document.querySelector('.success-message').style.display = 'none';
            }, 3000);

        } catch (err) {
            console.error(err);
            alert("Error booking appointment");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    return (
        <div className="bookpage-container">
            <div className="bookpage-header">
                <h1>Book an Appointment</h1>
                <p>Schedule your visit with our healthcare professionals</p>
            </div>

            <div className="bookpage-content">
                <div className="booking-form-section">
                    <div className="form-card">
                        <h2>Schedule Your Visit</h2>
                        <p className="form-subtitle">Fill in your details to book an appointment</p>

                        <form onSubmit={handleSubmit} className="booking-form">
                            <div className="form-group">
                                <label htmlFor="mobile_number">Mobile Number</label>
                                <input
                                    id="mobile_number"
                                    type="tel"
                                    name="mobile_number"
                                    placeholder="Enter your mobile number"
                                    value={formData.mobile_number}
                                    onChange={handleInputChange}
                                    required
                                    pattern="[0-9]{10}"
                                    title="Please enter a valid 10-digit mobile number"
                                />
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label htmlFor="date">Date</label>
                                    <input
                                        id="date"
                                        type="date"
                                        name="date"
                                        value={formData.date}
                                        onChange={handleInputChange}
                                        required
                                        min={new Date().toISOString().split('T')[0]}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="time">Time</label>
                                    <select
                                        id="time"
                                        name="time"
                                        value={formData.time}
                                        onChange={handleInputChange}
                                        required
                                    >
                                        {availableTimeSlots.map(time => (
                                            <option key={time} value={time}>{time}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <button
                                type="submit"
                                className={`submit-btn ${isSubmitting ? 'submitting' : ''}`}
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? (
                                    <>
                                        <span className="spinner"></span>
                                        Booking...
                                    </>
                                ) : (
                                    <>
                                        <i className="fas fa-calendar-check"></i>
                                        Book Appointment
                                    </>
                                )}
                            </button>
                        </form>

                        <div className="success-message">
                            <i className="fas fa-check-circle"></i>
                            <span>Appointment booked successfully!</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Bookpage;