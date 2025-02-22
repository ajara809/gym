import React from "react";
import "../styles/landing.css";
import { Link } from 'react-router-dom';

function LandingPage() {
  return (
    <div className="landing-container">
      <div className="overlay">
        <div className="content">
          <h1 id="lanh1">Welcome to Xtream Gym</h1>
          <p id="lanp">Your fitness journey starts here.</p>
          <Link to="/login"><button className="cta-button">Join Us Today</button></Link>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
