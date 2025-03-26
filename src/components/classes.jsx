import React, { useEffect, useState } from "react";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebase.js";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import '../styles/home.css';
import '../styles/classes.css';
import { Link } from 'react-router-dom';
import ww from './images/weightloss.jpg';
import yoga from './images/yoga.jpg';
import cycle from './images/cycle.jpg';
import bb from './images/bb.jpg';
import hp from './images/hyp.jpg';

function Classes() {
    const navigate = useNavigate();
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
         </nav>
   
         <section className="class-schedule-section">
            <h2>Class Schedule</h2>
            <p className="class-intro">Explore our diverse training sessions designed to fit your fitness goals. Choose from Weight Loss, Yoga, Cycling, Body Building, and Hypertrophy classes guided by expert trainers.</p>
            <div className="class-schedule-container">
                <div className="class-card">
                    <h3>Weight Loss</h3>
                    <img src={ww} alt="Weight Loss" />
                    <p>Join our effective weight loss sessions and achieve your fitness goals with personalized plans.</p>
                    <button onClick={() => navigate("/WL")}>Detail</button>
                </div>
                <div className="class-card">
                    <h3>Classic Yoga</h3>
                    <img src={yoga} alt="Yoga" />
                    <p>Find inner peace and improve flexibility with our classic yoga classes.</p>
                    <button onClick={() => navigate("/yoga")}>Detail</button>
                </div>
                <div className="class-card">
                    <h3>Cardio</h3>
                    <img src={cycle} alt="Cardio" />
                    <p>Boost your stamina and enjoy high-energy cardio sessions.</p>
                    <button onClick={() => navigate("/cardio")}>Detail</button>
                </div>
                <div className="class-card">
                    <h3>Body Building</h3>
                    <img src={bb} alt="Body Building" />
                    <p>Strengthen and sculpt your body with advanced body-building techniques.</p>
                    <button onClick={() => navigate("/bb")}>Detail</button>
                </div>
                <div className="class-card">
                    <h3>Hypertrophy</h3>
                    <img src={hp} alt="Hypertrophy" />
                    <p>Focus on muscle growth with specialized hypertrophy training programs.</p>
                    <button onClick={() => navigate("/hyper")}>Detail</button>
                </div>
            </div>

        </section>

        

        <footer className="footer-section">
            <div className="contact-info">
                <h3>Contact Us</h3>
                <p>Phone: +91 7397177540</p>
                <p>Email: xtream411@gmail.com</p>

                <h3>Location</h3>
                    <p>Jayasakthi Nagar, Chettiarpatti, Dhalavaipuram, Tamil Nadu 626122</p>
                    <a 
                        href="https://maps.app.goo.gl/KgpdPQj2S8kVrbfr5" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="map-link"
                     >View On Google Maps</a>
            </div>

            <div className="copyright">
                <p>&copy; 2025 Xtream Gym. All Rights Reserved.</p>
            </div>
        </footer>
        </>
    );
}

export default Classes;
