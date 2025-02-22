import '../styles/hyper.css'
import hyper from '../components/images/hyper.webp'
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebase.js"; 
import React, { useEffect, useState } from "react";



function HyperTrophy (){

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
    <div className="hypertrophy-container">
      <h2>Hypertrophy Training</h2>
       <img src={hyper} alt="Yoga" className="main-image" />
      <p>
        Hypertrophy training focuses on increasing muscle size through
        resistance training and progressive overload. This type of training
        typically involves moderate to high repetitions with controlled form and
        a focus on muscle contraction.
      </p>

      <h3>Basic Hypertrophy Exercises</h3>
      <ul>
        <li>
          Squats - A fundamental lower-body exercise targeting quads, hamstrings,
          and glutes.
        </li>
        <li>
          Bench Press - Builds chest, shoulders, and triceps strength.
        </li>
        <li>
          Deadlifts - A compound movement engaging the entire posterior chain.
        </li>
        <li>
          Overhead Press - Develops shoulder and upper body strength.
        </li>
      </ul>

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
      <table className="schedule-table">
        <thead>
          <tr>
            <th>Day</th>
            <th>Exercise</th>
            <th>Reps & Sets</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Monday</td>
            <td>Squats, Leg Press</td>
            <td>4x8-12</td>
          </tr>
          <tr>
            <td>Wednesday</td>
            <td>Bench Press, Incline Dumbbell Press</td>
            <td>4x8-12</td>
          </tr>
          <tr>
            <td>Friday</td>
            <td>Deadlifts, Bent-over Rows</td>
            <td>4x8-12</td>
          </tr>
          <tr>
            <td>Saturday</td>
            <td>Overhead Press, Lateral Raises</td>
            <td>4x8-12</td>
          </tr>
        </tbody>
      </table>
      <button onClick={() => window.history.back()} className="b2">Go Back</button>
    </div>
  );
};

export default HyperTrophy;
