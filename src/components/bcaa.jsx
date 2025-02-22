import React, { useEffect} from "react";
import bcaa1 from './images/bcaa1.webp'


function BCAADetails() {
  useEffect(() => {
              window.scrollTo(0, 0);
                          }, []);

  return (
    <div className="container">
      <h1 className="title">BCAA Supplements</h1>
      <img
        src={bcaa1}
        alt="BCAA Supplements"
        className="image"
      />
      <p>
        Branched-Chain Amino Acids (BCAAs) are essential nutrients that the
        body obtains from proteins found in food. They include leucine,
        isoleucine, and valine, which are important for muscle growth and
        recovery.
      </p>
      <h2>Main Benefits of BCAAs</h2>
      <ul>
        <li>Promotes muscle growth</li>
        <li>Reduces muscle soreness</li>
        <li>Decreases exercise fatigue</li>
        <li>Prevents muscle breakdown</li>
        <li>Supports immune function</li>
      </ul>
      <h2>Safe Usage Instructions</h2>
      <ul>
        <li>Follow the dosage recommended on the product label.</li>
        <li>Best taken before, during, or after a workout.</li>
        <li>Stay hydrated while using BCAAs.</li>
        <li>Consult a healthcare provider if you have any medical conditions.</li>
        <li>Avoid excessive use to prevent any side effects.</li>
      </ul>
      <button onClick={() => window.history.back()} className="b2">Go Back</button>
    </div>
  );
};

export default BCAADetails;
