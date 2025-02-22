import '../styles/omega.css'
import omega from '../components/images/omega.avif'
import React, { useEffect} from "react";

function Omega3Details() {
     useEffect(() => {
        window.scrollTo(0, 0);
                    }, []);
    return (
        <div className="container">

            <h1 className="title">Omega-3 Fish Oil Supplements</h1>
            <img src={omega} alt="Omega-3 Fish Oil" className="image" />
            <p className="description">Omega-3 fish oil supplements are essential for overall health, supporting heart, brain, and joint health.</p>
            
            <h2 className="subtitle">Key Benefits</h2>
            <ul className="list">
                <li>Supports heart health and reduces inflammation</li>
                <li>Enhances brain function and memory</li>
                <li>Promotes healthy skin and hair</li>
                <li>Improves joint flexibility and reduces pain</li>
            </ul>
            
            <h2 className="subtitle">Safe Usage Instructions</h2>
            <ul className="list">
                <li>Take 1-2 capsules daily with meals</li>
                <li>Do not exceed the recommended dosage</li>
                <li>Consult a doctor if pregnant, nursing, or on medication</li>
                <li>Store in a cool, dry place away from sunlight</li>
            </ul>
            <button onClick={() => window.history.back()} className="b2">Go Back</button>
        </div>
        
    );
};

export default Omega3Details;
