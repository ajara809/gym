import '../styles/wl.css'
import wl from '../components/images/wl.jpg'
import hiit from '../components/images/hiit.webp'
import car from '../components/images/car.jpg'
import st from '../components/images/st.webp'
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebase.js"; 
import React, { useEffect, useState } from "react";


function WeightLossDetails() {
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
        <div className="weight-loss-details">
            <h1>Weight Loss Program Details</h1>
            <img src={wl} alt="Weight Loss" className="main-image" />
            
            <section>
                <h2>About the Program</h2>
                <p>
                    Our Weight Loss program is designed to help you achieve your fitness goals through personalized plans,
                    effective workouts, and expert guidance. Whether you're looking to shed a few pounds or make a
                    significant transformation, our trainers are here to support you every step of the way.
                </p>
            </section>

            <section>
                <h2>Exercises Included</h2>
                <ul>
                    <li>High-Intensity Interval Training (HIIT)</li>
                    <li>Cardio Workouts (Running, Cycling, Rowing)</li>
                    <li>Strength Training</li>
                    <li>Core Strengthening Exercises</li>
                    <li>Flexibility and Mobility Drills</li>
                </ul>
                <div className="exercise-images">
                    <img src={hiit} alt="HIIT" className="exercise-image" />
                    <img src={car} alt="Cardio" className="exercise-image" />
                    <img src={st} alt="Strength Training" className="exercise-image" />
                </div>
            </section>

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
                    <li>Evening: 6:00 PM - 8:00 PM</li>
                </ul>
            </section>

            <button onClick={() => window.history.back()} className="button">Go Back</button>
        </div>
    );
};

export default WeightLossDetails;