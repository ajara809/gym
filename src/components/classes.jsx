import React, { useEffect, useState } from "react";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebase.js";
import { useNavigate } from "react-router-dom";
import '../styles/home.css';
import '../styles/classes.css';
import { Link } from 'react-router-dom';
import ww from './images/weightloss.jpg'
import yoga from './images/yoga.jpg'
import cycle from './images/cycle.jpg'
import bb from './images/bb.jpg'
import hp from './images/hyp.jpg'

function Classes() {
    const [schedules, setSchedules] = useState([]);
    const navigate = useNavigate();
    const dayOrder = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    useEffect(() => {
        const fetchSchedules = async () => {
            const querySnapshot = await getDocs(collection(db, "classSchedules"));
            let data = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

            // Sort schedules based on day order
            data.sort((a, b) => dayOrder.indexOf(a.day) - dayOrder.indexOf(b.day));

            setSchedules(data);
        };
        fetchSchedules();
    }, []);

    return (
        <>
           <nav>
             <div className="logo">Xtream Gym</div>
             <div className="nav-links">
                <Link to="/home">Home</Link>
                <Link to="/class">Classes</Link>
                <Link to="/product">Products</Link>
                <Link to="/blog">Blogs</Link>
                <a href="#join">Join Us</a>
             </div>
         </nav>
   
         <section className="class-schedule-section">
    <h2>Class Schedule</h2>
    <p className="class-intro">Explore our diverse training sessions designed to fit your fitness goals. Choose from Weight Loss, Yoga, Cycling, Body Building, and Hypertrophy classes guided by expert trainers.</p>
    <div className="class-schedule-container">
        <div className="class-card">
            <h3>Weight Loss</h3>
            <img src={ww} alt="" />
            <p>Join our effective weight loss sessions and achieve your fitness goals with personalized plans.</p>
            <button onClick={() => navigate("/WL")} >Detail</button>
        </div>
        <div className="class-card">
            <h3>Classic Yoga</h3>
            <img src={yoga} alt="" />
            <p>Find inner peace and improve flexibility with our classic yoga classes.</p>
            <button onClick={() => navigate("/yoga")} >Detail</button>
        </div>
        <div className="class-card">
            <h3>Cardio</h3>
            <img src={cycle} alt="" />
            <p>Boost your stamina and enjoy high-energy cardio sessions.</p>
            <button id="b3" onClick={() => navigate("/cardio")}>Detail</button>
        </div>
        <div className="class-card">
            <h3>Body Building</h3>
            <img src={bb} alt="" />
            <p>Strengthen and sculpt your body with advanced body-building techniques.</p>
            <button id="b4" onClick={() => navigate("/bb")}>Detail</button>
        </div>
        <div className="class-card">
            <h3>Hypertrophy</h3>
            <img src={hp} alt="" />
            <p>Focus on muscle growth with specialized hypertrophy training programs.</p>
            <button onClick={() => navigate("/hyper")}>Detail</button>
        </div>
    </div>
</section>

     <section className="class-schedule-section">
            <p className="class-intro">Explore our weekly fitness classes.</p>
            <div className="class-schedule-container">
                {schedules.map((schedule) => (
                    <div key={schedule.id} className="class-card">
                        <h3>{schedule.className}</h3>
                        <p>Day: {schedule.day}</p>
                        <p>Time: {schedule.time}</p>
                    </div>
                ))}
            </div>
        </section>
    
    <footer className="footer-section">
        <div className="contact-info">
            <h3>Contact Us</h3>
            <p>Phone: +91 7397177540</p>
            <p>Email: xtream411@gmail.com</p>
            <div className="social-icons">
                <a href="#" className="social-icon">Instagram</a>
                <a href="#" className="social-icon">Facebook</a>
                <a href="#" className="social-icon">Twitter</a>
            </div>
        </div>

        <div className="feedback-section">
            <h3>Feedback</h3>
            <form action="#" method="POST">
                <textarea name="feedback" placeholder="Your feedback" rows="4" required></textarea>
                <button type="submit">Submit</button>
            </form>
        </div>

        <div className="copyright">
            <p>&copy; 2025 Xtream Gym. All Rights Reserved.</p>
        </div>
    </footer>
        </>
    );
}

export default Classes;
