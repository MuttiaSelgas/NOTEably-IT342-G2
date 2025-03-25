import axios from "axios";
import React, { useEffect, useState } from "react";

const Dashboard = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true); 
    const [error, setError] = useState(null); 

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get("http://localhost:8080/user-info", { withCredentials: true });

                setUser(response.data);
            } catch (error) {
                console.error('Error occurred: ', error);
                setError(error.message);
            } finally {
                setLoading(false); 
            }
        };

        fetchUser();
    }, []);

    return (
        <div>
            <h2>Dashboard</h2>
            {loading ? (
                <p>Loading User Data...</p>
            ) : error ? (
                <p style={{ color: "red" }}>Failed to load user data: {error}</p>
            ) : (
                <div>
                    <p><strong>Name: </strong>{user?.name}</p>
                    <p><strong>Email: </strong>{user?.email}</p>
                    {user.picture && <img src={user.picture}
                        alt="User Profile"
                        referrerPolicy="no-referrer"/>}
                </div>
            )}
        </div>
    );
};

export default Dashboard;
