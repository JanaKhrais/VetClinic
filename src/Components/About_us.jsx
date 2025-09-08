import { useState, useEffect } from "react";
import "../css/About_us.css";

const About_us = () => {
    const [activeService, setActiveService] = useState(0);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Animation trigger on component mount
        setIsVisible(true);

        // Auto rotate services
        const interval = setInterval(() => {
            setActiveService((prev) => (prev + 1) % 3);
        }, 4000);

        return () => clearInterval(interval);
    }, []);

    const teamMembers = [
        {
            name: "Dr. Sarah Johnson",
            role: "Chief Veterinarian",
            bio: "Specialized in surgery with over 10 years of experience treating pets.",
            image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80"
        },
        {
            name: "Dr. Michael Chen",
            role: "Dental Specialist",
            bio: "Expert in pet dental care and oral surgery with a gentle approach.",
            image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80"
        },
        {
            name: "Dr. Emily Rodriguez",
            role: "Behavioral Therapist",
            bio: "Helps pets with anxiety and behavioral issues using positive reinforcement.",
            image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80"
        }
    ];

    const services = [
        {
            title: "Online Consultations",
            description: "Connect with our veterinarians from the comfort of your home",
            icon: "fas fa-video"
        },
        {
            title: "Appointment Booking",
            description: "Schedule visits with our specialists easily and efficiently",
            icon: "fas fa-calendar-check"
        },
        {
            title: "Health Records",
            description: "Access your pet's medical history anytime, anywhere",
            icon: "fas fa-file-medical"
        }
    ];

    const stats = [
        { number: "5000+", label: "Happy Pets Treated" },
        { number: "15+", label: "Years of Experience" },
        { number: "98%", label: "Client Satisfaction" },
        { number: "24/7", label: "Emergency Support" }
    ];

    return (
        <div className={`about-container ${isVisible ? 'visible' : ''}`}>
            <div className="about-hero">
                <div className="hero-content">
                    <h1>About VPet Clinic</h1>
                    <p>Your trusted partner in pet healthcare</p>
                    <button className="cta-button">Meet Our Team</button>
                </div>
                <div className="hero-image">
                    <img
                        src="https://images.unsplash.com/photo-1535930749574-1399327ce78f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
                        alt="Happy dog at veterinary clinic"
                    />
                </div>
            </div>

            <div className="stats-section">
                <div className="stats-container">
                    {stats.map((stat, index) => (
                        <div key={index} className="stat-item">
                            <h3>{stat.number}</h3>
                            <p>{stat.label}</p>
                        </div>
                    ))}
                </div>
            </div>

            <div className="about-content">
                <section className="about-section mission-section">
                    <div className="section-content">
                        <h2>Our Mission</h2>
                        <p>
                            At VPet Clinic, we're dedicated to providing accessible, high-quality healthcare
                            services for your beloved pets. Our mission is to make pet healthcare convenient,
                            affordable, and centered around the well-being of your furry family members.
                        </p>
                        <div className="mission-features">
                            <div className="feature">
                                <i className="fas fa-heart"></i>
                                <span>Compassionate Care</span>
                            </div>
                            <div className="feature">
                                <i className="fas fa-star"></i>
                                <span>Excellence in Service</span>
                            </div>
                            <div className="feature">
                                <i className="fas fa-hand-holding-heart"></i>
                                <span>Accessible to All</span>
                            </div>
                        </div>
                    </div>
                    <div className="section-image">
                        <img
                            src="https://images.unsplash.com/photo-1543852786-1cf6624b9987?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
                            alt="Veterinarian caring for a dog"
                        />
                    </div>
                </section>

                <section className="about-section team-section">
                    <h2>Our Expert Team</h2>
                    <p className="team-intro">
                        Our team consists of experienced veterinary professionals who are committed
                        to your pet's well-being. From veterinarians to support staff, everyone at
                        VPet Clinic is focused on delivering exceptional care.
                    </p>
                    <div className="team-grid">
                        {teamMembers.map((member, index) => (
                            <div key={index} className="team-card">
                                <div className="team-image">
                                    <img src={member.image} alt={member.name} />
                                    <div className="team-overlay">
                                        <div className="social-links">
                                            <a href="#"><i className="fab fa-twitter"></i></a>
                                            <a href="#"><i className="fab fa-linkedin-in"></i></a>
                                            <a href="#"><i className="fas fa-envelope"></i></a>
                                        </div>
                                    </div>
                                </div>
                                <div className="team-info">
                                    <h3>{member.name}</h3>
                                    <p className="team-role">{member.role}</p>
                                    <p className="team-bio">{member.bio}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                <section className="about-section services-section">
                    <h2>Our Services</h2>
                    <p className="services-intro">
                        We offer a comprehensive range of veterinary services to keep your pets
                        healthy and happy throughout all stages of their lives.
                    </p>

                    <div className="services-display">
                        <div className="service-cards">
                            {services.map((service, index) => (
                                <div
                                    key={index}
                                    className={`service-card ${index === activeService ? 'active' : ''}`}
                                    onMouseEnter={() => setActiveService(index)}
                                >
                                    <div className="service-icon">
                                        <i className={service.icon}></i>
                                    </div>
                                    <h3>{service.title}</h3>
                                    <p>{service.description}</p>
                                    <button className="service-btn">Learn More</button>
                                </div>
                            ))}
                        </div>

                        <div className="service-visual">
                            <div className="visual-container">
                                <div className={`pet-image ${activeService === 0 ? 'active' : ''}`}>
                                    <img
                                        src="https://images.unsplash.com/photo-1583337130417-3346a1be7dee?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
                                        alt="Online veterinary consultation"
                                    />
                                </div>
                                <div className={`pet-image ${activeService === 1 ? 'active' : ''}`}>
                                    <img
                                        src="https://images.unsplash.com/photo-1596272875729-ed2ff7d6d9c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
                                        alt="Pet appointment booking"
                                    />
                                </div>
                                <div className={`pet-image ${activeService === 2 ? 'active' : ''}`}>
                                    <img
                                        src="https://images.unsplash.com/photo-1596627114212-94ffd46c5e3f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
                                        alt="Pet health records"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="about-section cta-section">
                    <div className="cta-content">
                        <h2>Ready to give your pet the best care?</h2>
                        <p>Book an appointment with our expert team today</p>
                        <div className="cta-buttons">
                            <button className="cta-primary">Book Now</button>
                            <button className="cta-secondary">Learn More</button>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default About_us;