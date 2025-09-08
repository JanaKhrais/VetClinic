// Components/About_us.js// Components/Footer.js
import "../css/Footer.css";

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-content">
                    <div className="footer-section">
                        <h3 className="footer-title">VClinic</h3>
                        <p className="footer-description">
                            Your trusted healthcare partner providing accessible,
                            high-quality medical services for everyone.
                        </p>
                        <div className="footer-socials">
                            <a href="#" className="social-link">
                                <i className="fab fa-facebook-f"></i>
                            </a>
                            <a href="#" className="social-link">
                                <i className="fab fa-twitter"></i>
                            </a>
                            <a href="#" className="social-link">
                                <i className="fab fa-instagram"></i>
                            </a>
                            <a href="#" className="social-link">
                                <i className="fab fa-linkedin-in"></i>
                            </a>
                        </div>
                    </div>

                    <div className="footer-section">
                        <h4 className="footer-subtitle">Quick Links</h4>
                        <ul className="footer-links">
                            <li><a href="/">Home</a></li>
                            <li><a href="/About_us">About Us</a></li>
                            <li><a href="/Bookpage">Book Appointment</a></li>
                            <li><a href="/Profile">My Appointments</a></li>
                            <li><a href="/Login">Login</a></li>
                        </ul>
                    </div>

                    <div className="footer-section">
                        <h4 className="footer-subtitle">Services</h4>
                        <ul className="footer-links">
                            <li><a >Online Consultations</a></li>
                            <li><a >Health Checkups</a></li>
                            <li><a>Specialist Appointments</a></li>
                            <li><a >Emergency Care</a></li>
                            <li><a >Health Records</a></li>
                        </ul>
                    </div>

                    <div className="footer-section">
                        <h4 className="footer-subtitle">Contact Info</h4>
                        <div className="contact-info">
                            <div className="contact-item">
                                <i className="fas fa-map-marker-alt"></i>
                                <span>123 Healthcare Ave, Medical District, City</span>
                            </div>
                            <div className="contact-item">
                                <i className="fas fa-phone"></i>
                                <span>(123) 456-7890</span>
                            </div>
                            <div className="contact-item">
                                <i className="fas fa-envelope"></i>
                                <span>info@vclinic.com</span>
                            </div>
                            <div className="contact-item">
                                <i className="fas fa-clock"></i>
                                <span>Mon-Fri: 8am-8pm, Sat-Sun: 9am-5pm</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="footer-bottom">
                    <div className="footer-bottom-content">
                        <p>&copy; {new Date().getFullYear()} VClinic. All rights reserved.</p>
                        <div className="footer-legal">
                            <a href="#">Privacy Policy</a>
                            <a href="#">Terms of Service</a>
                            <a href="#">Cookie Policy</a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;