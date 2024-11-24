import "../styles/Landing.css";
import { Link } from 'react-router-dom';

const Landing = () => {
  return (
    <div className="landing-main">
      <h1>Welcome to logix!</h1>
      <p>Get started by signing in or signing up</p>
      <div className="landing-buttons">
        <Link to="/signin" className="landing-signin-button">Sign In</Link>
        <Link to="/signup" className="landing-signup-button">Sign Up</Link>
      </div>
    </div>
  );
}

export default Landing;
