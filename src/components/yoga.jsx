import '../styles/yoga.css';
import y from './/images/y.jpg'
import hatha from './/images/hatha.jpg'
import vin from '../components/images/vin.jpg'
import ash from './/images/ash.jpg'
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebase.js"; 
import React, { useEffect, useState } from "react";


function YogaDetails() {
    const [trainers, setTrainers] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        window.scrollTo(0, 0);
      }, []);
      
    useEffect(() => {
            const retrieveTrainerData = async () => {
              try {
                const querySnapshot = await getDocs(collection(db, "trainers"));
                const trainersData = querySnapshot.docs.map(doc => doc.data());
                setTrainers(trainersData); // Update state with trainers
              } catch (error) {
                console.error("Error fetching trainers:", error);
              } finally {
                setLoading(false); // Stop loading once data is fetched
              }
            };
        
            retrieveTrainerData();
          }, []);
    
    

    return (
        <div className="yoga-details">
            <h1>Classic Yoga Details</h1>
            <img src={y} alt="Yoga" className="mmain-image" />
            
            <p>
                Classic Yoga is a holistic approach to physical and mental well-being. It combines postures (asanas), 
                breathing techniques (pranayama), and meditation to promote flexibility, strength, and inner peace.
            </p>

            <h2>Basic Main Yogas</h2>
            <ul>
                <li><strong>Hatha Yoga</strong> - Focuses on physical postures and breathing techniques.</li>
                <li><strong>Vinyasa Yoga</strong> - A dynamic flow of postures synchronized with breath.</li>
                <li><strong>Ashtanga Yoga</strong> - A rigorous style following a specific sequence of postures.</li>
                <li><strong>Iyengar Yoga</strong> - Emphasizes precision and alignment in postures.</li>
                <li><strong>Kundalini Yoga</strong> - Combines postures, breathing, and chanting to awaken energy.</li>
            </ul>

            <h2>Images</h2>
            <div className="yoga-images">
                <img src={hatha} alt="Hatha Yoga" />
                <img src={vin} alt="Vinyasa Yoga" />
                <img src={ash} alt="Ashtanga Yoga" />
            </div>

            <section className="trainers-section">
                <h2>Meet Our Trainers</h2>
                {loading ? (
                  <p>Loading trainers...</p> // Show loading message
                ) : (
                <div className="trainers-container">
                  {trainers.map((trainer, index) => (
                <div className="trainer-card" key={index}>
                <h3>{trainer.name}</h3>
                <p>{trainer.description}</p>
               </div>
             ))}
               </div>
            )}
            </section>


            <section>
                <h2>Schedule</h2>
                <p>
                    Sessions are available Monday to Saturday. Choose from morning or evening slots to fit your
                    schedule.
                </p>
                <ul>
                    <li>Morning: 6:00 AM - 8:00 AM</li>
                </ul>
            </section>

            <button onClick={() => window.history.back()} className="b1">Go Back</button>
        </div>
    );
};

export default YogaDetails;