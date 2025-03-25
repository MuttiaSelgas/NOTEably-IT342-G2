import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
//import { API_ENDPOINTS } from "./config/api";
//import "./Login.css";

const Home = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [message, setMessage] = useState("");
    const [animationPhase, setAnimationPhase] = useState("pass-hide");
    const [customAlertMessage, setCustomAlertMessage] = useState("");
    const [isAlertVisible, setIsAlertVisible] = useState(false);

    const googleLogin = () => {
        window.location.href = "http://localhost:8080/oauth2/authorization/google";
    };

    const githubLogin = () => {
        window.location.href = "http://localhost:8080/oauth2/authorization/github";
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                //API_ENDPOINTS.STUDENT.LOGIN,
                { email, password },
                { headers: { "Content-Type": "application/json" } }
            );

            if (response.data) {
                localStorage.setItem("studentId", response.data.id);
                localStorage.setItem("studentName", response.data.name);
                showAlert("Login successful!");
                setTimeout(() => navigate("/dashboard"), 1500);
            } else {
                setMessage("Invalid credentials. Please try again.");
            }
        } catch (error) {
            console.error("Error during login:", error);
            setMessage("Error logging in. Please check your credentials.");
        }
    };

    const handleTogglePassword = () => {
        if (showPassword) {
            setAnimationPhase("pass-inbetween");
            setTimeout(() => setAnimationPhase("pass-hide-transition"), 200);
            setTimeout(() => {
                setAnimationPhase("pass-hide");
                setShowPassword(false);
            }, 400);
        } else {
            setAnimationPhase("pass-inbetween");
            setTimeout(() => setAnimationPhase("pass-show-transition"), 200);
            setTimeout(() => {
                setAnimationPhase("pass-show");
                setShowPassword(true);
            }, 400);
        }
    };

    const showAlert = (message) => {
        setCustomAlertMessage(message);
        setIsAlertVisible(true);
        setTimeout(() => setIsAlertVisible(false), 2000);
    };

    const imageUrl = {
        "pass-hide": "/ASSETS/pass-hide.png",
        "pass-hide-transition": "/ASSETS/pass-hide-transition.png",
        "pass-inbetween": "/ASSETS/pass-inbetween.png",
        "pass-show-transition": "/ASSETS/pass-show-transition.png",
        "pass-show": "/ASSETS/pass-show.png",
    }[animationPhase];

    return (
        <div className="home-container">
            <header className="header">
                <Link to="/">
                    <img src="/ASSETS/noteably_logo.png" alt="Noteably Logo" className="logo" />
                </Link>
                <div className="auth-buttons">
                    <Link to="/register">
                        <button className="auth-button register">Register</button>
                    </Link>
                    <Link to="/login">
                        <button className="auth-button login">Log In</button>
                    </Link>
                </div>
            </header>

            <div className="login-container">
                <img src={imageUrl} alt="Password visibility status" className={`password-image ${animationPhase}`} />
                <div className="login-card">
                    <h2>Welcome to NOTEably</h2>
                    <button onClick={googleLogin}>Login with Google</button>
                    <button onClick={githubLogin}>Login with Github</button>
                    <h3>Or log in with email</h3>
                    <p>No account? <Link to="/register">Sign up</Link></p>
                    <form onSubmit={handleLogin} className="login-form">
                        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                        <div className="password-container">
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <input type="checkbox" className="show-password-checkbox" checked={showPassword} onChange={handleTogglePassword} />
                        </div>
                        <button type="submit" className="login-button">Log in</button>
                    </form>
                    {message && <p className="error-message">{message}</p>}
                </div>
            </div>

            {isAlertVisible && (
                <div className="custom-alert">
                    <img src="/ASSETS/popup-alert.png" alt="Success Icon" className="alert-icon" />
                    <p>{customAlertMessage}</p>
                </div>
            )}
        </div>
    );
};

export default Home;
