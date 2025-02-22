import '../styles/bb.css'
import bp from './/images/bp.jfif'
import sq from './/images/sq.jfif'
import ded from './/images/ded.jfif'
import bb1 from './/images/bb1.jpg'
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebase.js"; 
import React, { useEffect, useState } from "react";


function bb() {
  const [trainers, setTrainers] = useState([]);
  const [loading, setLoading] = useState(true);
      
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
                  window.scrollTo(0, 0);
                }, []);


  return (
    <div className="bodybuilding-container">
      <h2>Body Building Training</h2>
      <img src={bb1} alt="Yoga" className="main-image" />
      
      <p>Strengthen and sculpt your body with our expert-led body-building training program. Learn advanced techniques and build muscle effectively.</p>
      
      <h3>Basic Body Building Exercises</h3>
      <ul>
        <li>Bench Press </li>
        <li>Squats </li>
        <li>Deadlifts </li>
        <li>Pull-Ups </li>
        <li>Shoulder Press </li>
      </ul>

      <h2>Images</h2>
        <div className="cardio-images">
              <img src={bp} alt="Running" />
              <img src={sq} alt="Cycling" />
             <img src={ded} alt="Swimming" />
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

      <h3>Training Schedule</h3>
      <table>
        <thead>
          <tr>
            <th>Day</th>
            <th>Workout</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Monday</td>
            <td>Chest & Triceps</td>
          </tr>
          <tr>
            <td>Tuesday</td>
            <td>Back & Biceps</td>
          </tr>
          <tr>
            <td>Wednesday</td>
            <td>Legs & Core</td>
          </tr>
          <tr>
            <td>Thursday</td>
            <td>Shoulders & Abs</td>
          </tr>
          <tr>
            <td>Friday</td>
            <td>Full Body Workout</td>
          </tr>
        </tbody>
      </table>
      <button onClick={() => window.history.back()} className="b2">Go Back</button>
    </div>
    
  );
};


export default bb;