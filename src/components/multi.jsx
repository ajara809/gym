import React, { useEffect} from "react";
import mv1 from './images/mv1.webp'

function MultiVitaminsDetails() {
    useEffect(() => {
                  window.scrollTo(0, 0);
                              }, []);
                              
  return (
    <div className="container">
      <h2 className="title">Multi Vitamins</h2>
      <img
        src={mv1}
        alt="Multi Vitamins"
        className="image"
      />
      <p className="description">
        Multivitamins can provide essential nutrients to gym-goers to support
        their health and performance. They help fill nutritional gaps and boost
        overall well-being.
      </p>
      <h3 className="subtitle">Benefits:</h3>
      <ul className="list">
        <li>Supports immune function</li>
        <li>Enhances energy levels</li>
        <li>Promotes muscle recovery</li>
        <li>Improves bone health</li>
        <li>Boosts overall wellness</li>
      </ul>
      <h3 className="subtitle">How to Take Safely:</h3>
      <ul className="list">
        <li>Follow the recommended dosage on the label</li>
        <li>Take with food for better absorption</li>
        <li>Consult a doctor if you have any health conditions</li>
        <li>Do not exceed the daily limit</li>
      </ul>
      <button onClick={() => window.history.back()} className="b2">Go Back</button>
    </div>
  );
};

export default MultiVitaminsDetails;
