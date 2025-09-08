// Components/Navigation.js
import { Link } from "react-router-dom";
import "../css/Navigation.css"; // We'll create this CSS file

const Navigation = ({ user, onLogout }) => {
    return (
        <header className="nav-header">
            <div className="nav-container">
                <h1 className="nav-logo">VClinic</h1>
                <nav className="nav-menu">
                    <Link to="/" className="nav-link">Home</Link>
                    <Link to="/About_us" className="nav-link">About Us</Link>
                    <Link to="/Appointments" className="nav-link">Appointments</Link>
                    <Link to="/Bookpage" className="nav-link">Book Now</Link>
                    <Link to="/Profile" className="nav-link">Profile Page</Link>
                    {user ? (
                        <button onClick={onLogout} className="nav-button">
                            Logout
                        </button>
                    ) : (
                        <Link to="/Login" className="nav-link nav-login">Login</Link>
                    )}
                </nav>
            </div>
        </header>
    );
};

export default Navigation;