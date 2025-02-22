import React, { useEffect} from "react";
import cr from '../components/images/cr.jpg'


function CreatineDetails() {
    useEffect(() => {
                window.scrollTo(0, 0);
                            }, []);
  return (
    <div className="container">
      <h1 className="title">Creatine Supplement Details</h1>
      <img src={cr} alt="Creatine Supplement" className="image" />
      <p className="description">
        Creatine is a natural compound found in muscle cells that helps produce
        energy during high-intensity exercise. Supplementing with creatine can
        improve performance, strength, and muscle mass.
      </p>
      <h2 className="subtitle">Key Benefits</h2>
      <ul className="list">
        <li>Enhances strength and power output</li>
        <li>Supports muscle growth and recovery</li>
        <li>Improves high-intensity performance</li>
        <li>Boosts energy production in cells</li>
        <li>May aid brain function and mental clarity</li>
      </ul>
      <h2 className="subtitle">Safe Usage Instructions</h2>
      <ul className="list">
        <li>Take 3-5 grams per day with water or juice</li>
        <li>Stay hydrated while using creatine</li>
        <li>Can be taken pre or post-workout</li>
        <li>Consult a healthcare professional if you have kidney issues</li>
        <li>No need for a loading phase, but optional for quicker saturation</li>
      </ul>
      <button onClick={() => window.history.back()} className="b2">Go Back</button>
    </div>
  );
};

export default CreatineDetails;