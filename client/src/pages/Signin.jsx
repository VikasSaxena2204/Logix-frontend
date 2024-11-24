import { useEffect, useState } from "react";
import Image from "../assets/SignIn.png"; 
import { FaEye } from "react-icons/fa6";
import { FaEyeSlash } from "react-icons/fa6";
import "../styles/Signin.css"; 
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const Signin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [token] = useState(JSON.parse(localStorage.getItem("auth")) || "");
  const navigate = useNavigate();

  // Handle Signin Form Submission
  const handleSigninSubmit = async (e) => {
    e.preventDefault();
    let email = e.target.email.value;
    let password = e.target.password.value;

    if (email.length > 0 && password.length > 0) {
      const formData = {
        email,
        password,
      };
      try {
        // Send POST request to backend for signin
        const response = await axios.post(
          "https://logix-backend.vercel.app/api/v1/signin",  
          formData
        );
       
        localStorage.setItem('auth', JSON.stringify(response.data.token));
        toast.success("SignIn successful");
        navigate("/dashboard");  
      } catch (err) {
        console.log(err);
        toast.error("Error: " + (err.response?.data?.msg || err.message));  // Show error message
      }
    } else {
      toast.error("Please fill all inputs");  
    }
  };

  // Check if the user is already logged in
  useEffect(() => {
    if (token !== "") {
      toast.success("You are already logged in");
      navigate("/dashboard");  
    }
  }, [token, navigate]);

  return (
    <div className="signin-main">
      <div className="signin-left">
        <img src={Image} alt="signin Illustration" />
      </div>
      <div className="signin-right">
        <div className="signin-card">
          <div className="signin-center">
            <h2>Let us Know <span className="red-text">!</span></h2>
            <p>Please enter your details</p>
            <form onSubmit={handleSigninSubmit}>
              <input type="email" placeholder="Email" name="email" required />
              <div className="pass-input-div">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  name="password"
                  required
                />
                {showPassword ? (
                  <FaEyeSlash
                    onClick={() => setShowPassword(!showPassword)}
                    style={{ cursor: "pointer" }}
                  />
                ) : (
                  <FaEye onClick={() => setShowPassword(!showPassword)} style={{ cursor: "pointer" }} />
                )}
              </div>
              <div className="signin-center-options">
                <a href="#" className="forgot-pass-link">
                  Forgot password?
                </a>
              </div>
              <div className="signin-center-button">
                <button type="submit" className="signin-btn">Sign In</button>
              </div>
              <div className="signup-center-button">
                <Link to="/Signup" className="signup-btn">
                  Sign Up
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signin;
