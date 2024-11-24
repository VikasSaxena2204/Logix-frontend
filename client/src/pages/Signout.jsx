import { useEffect, useState } from 'react';
import "../styles/Signout.css";
import { useNavigate } from 'react-router-dom';

const Signout = () => {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(3);

  useEffect(() => {
    localStorage.removeItem("auth");

    const timer = setInterval(() => {
      setCountdown((prevCountdown) => {
        if (prevCountdown === 1) {
          clearInterval(timer);
          navigate("/");
        }
        return prevCountdown - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [navigate]);

  return (
    <div className='signout-main'>
      <h1>Signout Successful!</h1>
      <p>You will be redirected to the signin page in {countdown} seconds...</p>
    </div>
  );
};

export default Signout;
