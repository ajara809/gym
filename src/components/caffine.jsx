import React, { useEffect} from "react";
import caff1 from './images/caff1.webp'

function CaffeineDetails() {
  useEffect(() => {
              window.scrollTo(0, 0);
                          }, []);

  return (
    <div className="container">
      <h1 className="title">Caffeine Supplements</h1>
      <img
        src={caff1}
        alt="Caffeine Supplement"
        className="image"
      />
      <p className="description">
        Caffeine is a natural stimulant that helps to keep you awake and alert
        when experiencing tiredness or weakness. It is commonly found in coffee,
        tea, energy drinks, and supplements.
      </p>

      <h2 className="subtitle">Benefits:</h2>
      <ul className="list">
        <li>Boosts alertness and reduces fatigue</li>
        <li>Enhances physical performance</li>
        <li>Improves focus and cognitive function</li>
        <li>Supports metabolism and fat burning</li>
      </ul>

      <h2 className="subtitle">Safe Usage Instructions:</h2>
      <ul className="list">
        <li>Do not exceed 400mg of caffeine per day.</li>
        <li>Avoid consuming caffeine late in the day to prevent sleep disturbances.</li>
        <li>Consult a healthcare professional if you have heart conditions or high blood pressure.</li>
        <li>Stay hydrated, as caffeine can have a mild diuretic effect.</li>
      </ul>
      <button onClick={() => window.history.back()} className="b2">Go Back</button>
    </div>
  );
};

export default CaffeineDetails;
