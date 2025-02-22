import wh from '../components/images/wh.jpg'
import React, { useEffect} from "react";


function WheyProteinDetails() {
    useEffect(() => {
            window.scrollTo(0, 0);
                        }, []);
  return (
    <div className="container">

      <h2 className="title">Whey Protein</h2>
      <img src={wh} alt="Whey Protein" className="image" />
      <p className="description">
        Whey protein is a high-quality protein source that aids in muscle growth and recovery. 
        It is widely used by athletes and fitness enthusiasts to support their nutrition.
      </p>
      <h3 className="title">Benefits:</h3>
      <ul className="list">
        <li>Supports muscle growth and repair</li>
        <li>Boosts immune system function</li>
        <li>Aids in weight loss and management</li>
        <li>Helps in reducing hunger and cravings</li>
      </ul>
      <h3 className="title">How to Take Safely:</h3>
      <ul className="list">
        <li>Mix one scoop with water, milk, or a smoothie.</li>
        <li>Consume post-workout for muscle recovery.</li>
        <li>Do not exceed recommended dosage.</li>
        <li>Consult a doctor if you have any medical conditions.</li>
      </ul>
      <button onClick={() => window.history.back()} className="b2">Go Back</button>
    </div>
  );
};

export default WheyProteinDetails;
