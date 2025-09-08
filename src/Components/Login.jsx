import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/Login.css";

const Login = ({ onLogin }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("user"); // dropdown chosen role
    const navigate = useNavigate();

    // Login function
    const handleLogin = async () => {
        try {
            const res = await fetch("http://localhost:5000/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            const data = await res.json();

            if (res.ok) {
                // Check if chosen role matches actual DB role
                if (data.user.role !== role) {
                    alert("You are not allowed. Wrong role selected.");
                    return;
                }

                console.log("Login success:", data.user);
                onLogin(data.user); // save user in App.jsx

                // Redirect based on role
                if (data.user.role === "admin") {
                    navigate("/admin");
                } else {
                    navigate("/Profile"); // or homepage for users
                }
            } else {
                alert(data.message);
            }
        } catch (err) {
            console.error(err);
            alert("Error connecting to server");
        }
    };

    // Signup function
    const handleSignup = async () => {
        try {
            const res = await fetch("http://localhost:5000/api/auth/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password, role }), // role saved to DB
            });

            const data = await res.json();
            if (res.ok) {
                onLogin(data.user);
                if (data.user.role === "admin") {
                    navigate("/admin");
                } else {
                    navigate("/Profile");
                }
            } else {
                alert(data.message);
            }
        } catch (err) {
            console.error(err);
            alert("Error connecting to server");
        }
    };

    return (
        <div className="login-container">
            <div className="form-container">
                <h2 className="form-title">Login / Sign Up</h2>

                <div className="input-group">
                    <input
                        className="login-input"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <div className="input-group">
                    <input
                        className="login-input"
                        placeholder="Password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                <div className="input-group">
                    <select
                        className="role-select"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                    >
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                    </select>
                </div>

                <div className="button-group">
                    <button className="login-btn" onClick={handleLogin}>Login</button>
                    <button className="signup-btn" onClick={handleSignup}>Sign Up</button>
                </div>
            </div>
        </div>
    );
};

export default Login;