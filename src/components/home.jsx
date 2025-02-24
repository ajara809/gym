import React, { useEffect, useState } from "react";
import '../styles/home.css';
import { useNavigate } from "react-router-dom";
import personal from './images/personal.jpg';
import group from './images/group.jpg';
import equip from './images/equip.jpeg';
import { Link } from 'react-router-dom';
import { collection, getDocs, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase/firebase.js"; 
import { auth } from "../firebase/firebase.js";
import { useAuthState } from "react-firebase-hooks/auth";
  
function Home() {
    const navigate = useNavigate();
    const [feedback, setFeedback] = useState("");
    const [user] = useAuthState(auth);
    const [plans, setPlans] = useState([]);
    const [trainers, setTrainers] = useState([]); // State to hold trainer data
    const [loading, setLoading] = useState(true); // Loading state
    const [programs, setPrograms] = useState([]);
    const [userEmail, setUserEmail] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!user) {
            alert("You must be logged in to submit feedback");
            return;
        }
        
        try {
            await addDoc(collection(db, "feedback"), {
                feedback,
                email: user.email,
                createdAt: serverTimestamp(),
            });
            alert("Feedback submitted successfully!");
            setFeedback("");
        } catch (error) {
            console.error("Error submitting feedback: ", error);
            alert("Failed to submit feedback");
        }
    };

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            if (user) {
                setUserEmail(user.email);
            } else {
                setUserEmail(null);
            }
        });
        return () => unsubscribe();
    }, []);

    // Fetch Plans from Firestore
    useEffect(() => {
        const fetchPlans = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "plans"));
                const plansData = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setPlans(plansData);
            } catch (error) {
                console.error("Error fetching plans:", error);
            }
        };

        fetchPlans();
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

      useEffect(() => {
        const fetchTrainingPrograms = async () => {
          const querySnapshot = await getDocs(collection(db, "trainingPrograms"));
          const programsList = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }));
          setPrograms(programsList);
        };
    
        fetchTrainingPrograms();
      }, []);

      const scrollToFeatures = () => {
        document.getElementById("features").scrollIntoView({ behavior: "smooth" });
    };
  

    return (
        <>
            <nav>
                <div className="logo">Xtream Gym</div>
                <div className="nav-links">
                    <Link to="/home">Home</Link>
                    <Link to="/class">Classes</Link>
                    <Link to="/product">Products</Link>
                    <Link to="/blog">Blogs</Link>
                    <Link to="/join">Join Us</Link>
                </div>
                {userEmail && <div className="user-email">{userEmail}</div>} {/* Display user email */}
            </nav>

            <section className="hero-section">
                <div className="hero-overlay">
                    <h1 id="h1">Push Your Limits</h1>
                    <p id="p">Transform your body, transform your life.</p>
                    <button className="get-started" onClick={scrollToFeatures}>Get Started</button>
                </div>
            </section>

            <section className="features-section" id="features">
                <h2>Why Choose Xtream Gym?</h2>
                <div className="features-container">
                    <div className="feature-card">
                        <h3>Personal Training</h3>
                        <img src={personal} alt="" />
                        <p>Work with certified trainers to achieve your fitness goals.</p>
                    </div>
                    <div className="feature-card">
                        <h3>Group Classes</h3>
                        <img src={group} alt="" />
                        <p>Join fun and energetic classes like yoga, Cardio, and HIIT.</p>
                    </div>
                    <div className="feature-card">
                        <h3>State-of-the-Art Equipment</h3>
                        <img src={equip} alt="" />
                        <p>Access the latest equipment for strength and cardio training.</p>
                    </div>
                </div>
            </section>

            <section className="pricing-section">
                <h2>Choose Your Plan</h2>
                <div className="pricing-container">
                    {plans.length === 0 ? (
                        <p>Loading plans...</p>
                    ) : (
                        plans.map((plan) => (
                            <div key={plan.id} className="pricing-card">
                                <h3>{plan.title}</h3>
                                <p className="price">{plan.price}</p>
                                <ul id="pul">
                                    {plan.features.map((feature, index) => (
                                        <li key={index}>{feature}</li>
                                    ))}
                                </ul>
                            </div>
                        ))
                    )}
                </div>
            </section>

            <section className="training-section">
                 <h2>Our Training Programs</h2>
                 {loading ? (
                  <p>Loading trainers...</p> // Show loading message
                ) : (
                 <div className="training-container">
                     {programs.map((program) => (
                     <div key={program.id} className="training-card">
                         <h3>{program.title}</h3>
                        <p>{program.description}</p>
                     </div>
                     ))}
                </div>
                )}
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



            <footer className="footer-section">
                <div className="contact-info">
                    <h3>Contact Us</h3>
                    <p>Phone: +91 7397177540</p>
                    <p>Email: xtreamgym2615@gmail.com</p>

                    <h3>Location</h3>
                    <p>Jayasakthi Nagar, Chettiarpatti, Dhalavaipuram, Tamil Nadu 626122</p>
                    <a 
                        href="https://maps.app.goo.gl/KgpdPQj2S8kVrbfr5" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="map-link"
                     >View On Google Maps</a>
                     
                    <div className="social-icons">
                        <a href="#" className="social-icon">Instagram</a>
                        <a href="#" className="social-icon">Facebook</a>
                        <a href="#" className="social-icon">Twitter</a>
                    </div>
                </div>

                <div className="feedback-section">
                    <h3>Feedback</h3>
                    <form onSubmit={handleSubmit}>
                         <textarea 
                            name="feedback"
                            placeholder="Your feedback"
                            rows="4"
                            required
                            value={feedback}
                            onChange={(e) => setFeedback(e.target.value)}
                         ></textarea>
                         <button type="submit">Submit</button>
                     </form>
                </div>

                <div className="copyright">
                    <p>&copy; 2025 Xtream Gym. All Rights Reserved.</p>
                </div>
                <button type="submit" style={{marginTop:'20px'}} onClick={() => navigate("/")}>Log Out</button> 
            </footer>
        </>
    );
}

export default Home;
