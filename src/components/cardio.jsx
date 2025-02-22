import '../styles/cardio.css'
import cari from '../components/images/cari.webp'
import run from '../components/images/run.jpg'
import cyc from '../components/images/cyc.webp'
import jump from '../components/images/jump.jpg'
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebase.js"; 
import React, { useEffect, useState } from "react";


function CardioDetails() {

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
        <div className="cardio-details">
            <h1>Cardio Training</h1>
             <img src={cari} alt="Yoga" className="main-image" />

            <p>
                Cardio training is a form of exercise that increases your heart rate and improves cardiovascular health. 
                It helps in burning calories, improving stamina, and boosting overall fitness.
            </p>
            
            <h2>Basic Cardio Exercises</h2>
            <ul>
                <li>Running</li>
                <li>Cycling</li>
                <li>Jump Rope</li>
                <li>Swimming</li>
                <li>Rowing</li>
            </ul>

            <h2>Images</h2>
            <div className="cardio-images">
                <img src={run} alt="Running" />
                <img src={cyc} alt="Cycling" />
                <img src={jump} alt="Swimming" />
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

            <h2>Schedule</h2>
            <p>Join our Cardio classes every Monday, Wednesday, and Friday at</p>
            <ul>
                    <li>Morning: 7:00 AM - 8:00 AM</li>
                    <li>Evening: 4.00 PM - 6.00 PM</li>
            </ul>

            <button onClick={() => window.history.back()} className="b2">Go Back</button>
        </div>
    );
};

export default CardioDetails;