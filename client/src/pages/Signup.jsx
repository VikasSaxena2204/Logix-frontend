import { useEffect, useState } from "react";
import Image from "../assets/SignUp.png";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "../styles/Signup.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [token] = useState(JSON.parse(localStorage.getItem("auth")) || "");
  const navigate = useNavigate();

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const firstname = formData.get("firstname");
    const lastname = formData.get("lastname");
    const email = formData.get("email");
    const phone = formData.get("phone");
    const password = formData.get("password");
    const confirmPassword = formData.get("confirmPassword");
    const contactMode = formData.get("contactMode");

    if (firstname && lastname && email && phone && password && confirmPassword) {
      if (password === confirmPassword) {
        try {
          await axios.post("http://localhost:3000/api/v1/signup", {
            firstname,
            lastname,
            email,
            password,
            contactMode,
            contactNo: contactMode === "phone" ? phone : undefined,
          });
          toast.success("Registration successful!");
          navigate("/signin");
        } catch (err) {
          const errorMessage =
            err.response?.data?.msg || "An error occurred during registration. Please try again.";
          toast.error(errorMessage);
        }
      } else {
        toast.error("Passwords do not match!");
      }
    } else {
      toast.error("Please fill in all the required fields.");
    }
  };

  useEffect(() => {
    if (token) {
      toast.success("You are already logged in!");
      navigate("/dashboard");
    }
  }, [navigate, token]);

  return (
    <div className="signup-container">
      <div className="signup-left">
        <img src={Image} alt="Signup Illustration" className="signup-image" />
      </div>
      <div className="signup-card">
        <div className="signup-right">
          <h2 className="signup-header">
            Let us know<span className="highlight-red">!</span>
            <Link to="/signin" className="signin-link">
              Sign<span className="highlight-red">In</span>
            </Link>
          </h2>
          <p className="signup-subheader">Please enter your details</p>
          <form onSubmit={handleSignupSubmit} className="signup-form">
            <input type="text" name="firstname" placeholder="First Name" required />
            <input type="text" name="lastname" placeholder="Last Name" required />
            <input type="email" name="email" placeholder="Email" required />
            <input type="tel" name="phone" placeholder="Phone Number" required />
            <div className="password-container">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Set Password"
                required
              />
              {showPassword ? (
                <FaEyeSlash onClick={() => setShowPassword(!showPassword)} />
              ) : (
                <FaEye onClick={() => setShowPassword(!showPassword)} />
              )}
            </div>
            <div className="password-container">
              <input
                type={showPassword ? "text" : "password"}
                name="confirmPassword"
                placeholder="Retype Password"
                required
              />
              {showPassword ? (
                <FaEyeSlash onClick={() => setShowPassword(!showPassword)} />
              ) : (
                <FaEye onClick={() => setShowPassword(!showPassword)} />
              )}
            </div>
            <select name="contactMode" className="contact-mode-select" required>
              <option value="">Preferred Contact Mode</option>
              <option value="email">Email</option>
              <option value="phone">Phone</option>
            </select>
            <button type="submit" className="signup-button">
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
