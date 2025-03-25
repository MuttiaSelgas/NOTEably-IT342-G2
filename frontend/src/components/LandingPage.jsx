import React from "react";
import { Link, useNavigate } from "react-router-dom";

function LandingPage({ onLogin }) {
    const navigate = useNavigate();

    const handleLogin = () => {
        onLogin(); // Update state to indicate user is logged in
        navigate("/"); // Redirect to Home
    };

    return (
        <div className="landing-container">
            <header>
                <Link to="/">
                    <img src="/ASSETS/noteably_logo.png" alt="Noteably Logo" />
                </Link>
                <div>
                    <Link to="/register">
                        <button>Register</button>
                    </Link>
                    <button onClick={handleLogin}>Log In</button> {/* Redirects to Home */}
                </div>
            </header>

            <main>
                <div>
                    <img src="/ASSETS/welcome.png" alt="Welcome" />
                    <p>Sign in to make study life easier, one feature at a time!</p>
                    <Link to="/register">
                        <button>Register</button>
                    </Link>
                </div>
            </main>
        </div>
    );
}

export default LandingPage;
