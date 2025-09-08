import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Pet1 from "../assets/pet1.jpg";
import Pet2 from "../assets/pet2.jpg";
import Pet3 from "../assets/pet3.jpg";
import "../css/Home.css";

function Home() {
    const [currentSlide, setCurrentSlide] = useState(0);

    const sliderImages = [
        Pet1,
        Pet2,
        Pet3
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % sliderImages.length);
        }, 5000);

        return () => clearInterval(interval);
    }, [sliderImages.length]);

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % sliderImages.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + sliderImages.length) % sliderImages.length);
    };

    return (
        <div className="home-container">
            {/* Hero Section with Slider */}
            <section className="hero-section">
                <div className="slider-container">
                    {sliderImages.map((image, index) => (
                        <div
                            key={index}
                            className={`slide ${index === currentSlide ? 'active' : ''}`}
                            style={{ backgroundImage: `url(${image})` }}
                        >
                            <div className="slide-overlay"></div>
                        </div>
                    ))}

                    <div className="slider-content">
                        <div className="home-text">
                            <h1 className="hero-title">
                                <span className="title-accent">VClinic</span> Grows with your pet!
                            </h1>
                            <p className="hero-subtitle">
                                Premium veterinary care with love and compassion for every member of your family
                            </p>

                            <div className="book-button">
                                <Link to="/Bookpage" className="cta-button">
                                    <span>Book your appointment</span>
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                        <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </Link>
                            </div>
                        </div>
                    </div>

                    <div className="slider-controls">
                        <button className="slider-btn prev-btn" onClick={prevSlide}>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                                <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>

                        <div className="slider-dots">
                            {sliderImages.map((_, index) => (
                                <button
                                    key={index}
                                    className={`dot ${index === currentSlide ? 'active' : ''}`}
                                    onClick={() => setCurrentSlide(index)}
                                />
                            ))}
                        </div>

                        <button className="slider-btn next-btn" onClick={nextSlide}>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                                <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>
                    </div>
                </div>
            </section>


            {/* <section className="about-section">
                <div className="about-container">
                    <div className="about-content">
                        <div className="about-text">
                            <h2 className="section-title">
                                <span className="title-decoration">About</span> Our Clinic
                            </h2>
                            <div className="divider"></div>
                            <p className="about-description">
                                Every clinic has its own story. At <span className="clinic-name">VClinic</span>, we believe all pets
                                are not just animals—they are family! Our mission is to provide exceptional care,
                                love, and compassion for all pets that walk through our doors.
                            </p>

                            <div className="features-grid">
                                <div className="feature-card">
                                    <div className="feature-icon">❤️</div>
                                    <h3>Compassionate Care</h3>
                                    <p>We treat every pet with the love and attention they deserve</p>
                                </div>

                                <div className="feature-card">
                                    <div className="feature-icon">⚕️</div>
                                    <h3>Expert Team</h3>
                                    <p>Highly qualified veterinarians dedicated to pet health</p>
                                </div>

                                <div className="feature-card">
                                    <div className="feature-icon">⭐</div>
                                    <h3>Premium Service</h3>
                                    <p>State-of-the-art facilities with personalized care</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section> */}

            {/* CTA Section */}
            <section className="cta-section">
                <div className="cta-container">
                    <h2>Ready to Give Your Pet the Best Care?</h2>
                    <p>Schedule an appointment today and become part of our family</p>
                    <Link to="/Bookpage" className="cta-button secondary">
                        <span>Schedule Now</span>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                            <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </Link>
                </div>
            </section>
        </div>
    );
}

export default Home;