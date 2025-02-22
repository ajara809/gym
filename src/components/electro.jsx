import React, { useEffect} from "react";
import electro1 from './images/electro1.jpg'

function ElectrolyteDetails() {
    useEffect(() => {
            window.scrollTo(0, 0);
                        }, []);
  return (
    <div className="container">
      <h1 className="title">Electrolyte Supplements</h1>
      <img
        src={electro1}
        alt="Electrolytes"
        className="image"
      />
      <p className="description">
        Electrolytes like calcium, magnesium, potassium, and sodium are crucial for maintaining
        muscle function, hydration, and nerve signaling. They help prevent cramps and improve
        overall performance.
      </p>
      
      <h2 className="subtitle">Main Benefits:</h2>
      <ul className="list">
        <li>Prevents muscle cramps and fatigue</li>
        <li>Enhances hydration and fluid balance</li>
        <li>Supports nerve function and muscle contraction</li>
        <li>Boosts endurance during workouts</li>
      </ul>
      
      <h2 className="subtitle">How to Take Safely:</h2>
      <ul className="list">
        <li>Follow the recommended dosage on the label</li>
        <li>Do not exceed daily intake limits</li>
        <li>Drink plenty of water while consuming electrolytes</li>
        <li>Consult a healthcare provider if you have kidney or heart conditions</li>
      </ul>
      <button onClick={() => window.history.back()} className="b2">Go Back</button>
    </div>
  );
};

export default ElectrolyteDetails;
