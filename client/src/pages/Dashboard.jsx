import { useEffect, useState, useCallback } from "react";
import "../styles/Dashboard.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const Dashboard = () => {
  const [token] = useState(JSON.parse(localStorage.getItem("auth")) || ""); 
  const [userData, setUserData] = useState({ firstname: "", lastname: "", email: "" }); 
  const navigate = useNavigate();

  // Fetch user data from the backend
  const fetchUserData = useCallback(async () => {
    if (!token) return; 

    try {
      const response = await axios.get("https://logix-backend.vercel.app/api/v1/user", {
        headers: { Authorization: `Bearer ${token}` }, 
      });

      setUserData(response.data);
    } catch (error) {
      console.error("Error fetching user data:", error.message);

      if (error.response?.status === 401) {
        toast.error("Session expired. Please sign in again.");
        localStorage.removeItem("auth");
        navigate("/signin");
      } else {
        toast.error("Failed to fetch user data. Please try again.");
      }
    }
  }, [token, navigate]);

  // fetch user data
  useEffect(() => {
    if (!token) {
      toast.warn("Please sign in to access the dashboard");
      navigate("/signin");
    } else {
      fetchUserData();
    }
  }, [token, navigate, fetchUserData]);

  // Sign out handler
  const handleSignOut = () => {
    localStorage.removeItem("auth"); 
    toast.success("Signed out successfully");
    navigate("/signin"); 
  };

  return (
    <div className="dashboard-container">
      {/* Navbar */}
      <nav className="navbar">
        <span className="navbar-title">Dashboard</span>
        <button className="signout-button" onClick={handleSignOut}>
          Sign Out
        </button>
      </nav>

      {/* Main Content */}
      <div className="content">
        <div className="user-card">
          <h1>
            Welcome, {userData.firstname} {userData.lastname || "User"}!
          </h1>
          <p>
            <span className="text">Email:</span> {userData.email || "xxxxxx@xxxx.com"}
          </p>
        </div>
      </div>

      {/* Footer */}
      <footer className="footer">
        <p>
          All rights reserved to{" "}
          <a
            href="https://github.com/VikasSaxena2204"
            target="_blank"
            rel="noopener noreferrer"
          >
            Vikas Saxena 🌟✨
          </a>{" "}
          2024
        </p>
      </footer>
    </div>
  );
};

export default Dashboard;
