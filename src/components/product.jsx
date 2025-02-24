import React from "react";
import '../styles/home.css'
import '../styles/product.css'
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import fish from './images/fish.jpg'
import whey from './images/whey.webp'
import crea from './images/crea.webp'
import bcaa from './images/bcaa.avif'
import caff from './images/caff.jpg'
import mv from './images/mv.jpg'
import electro from './images/electro.jpg'


function product(){
    const navigate = useNavigate();
    return(
        <>
          <nav>
             <div class="logo">Xtream Gym</div>
             <div class="nav-links">
               <Link to="/home">Home</Link>
               <Link to="/class">Classes</Link>
               <Link to="/product">Products</Link>
               <Link to="/blog">Blogs</Link>
               <Link to="/join">Join Us</Link>
             </div>
         </nav>

         <section className="about-section">
                <h1>About Our Products</h1>
                <p>
                    At Xtream Gym, we offer a wide range of high-quality products to support your fitness journey. From supplements to advanced equipment, we have everything you need to achieve your goals.
                </p>
            </section>

            <section className="products-section">
                <h2>Supplements</h2>
                <div className="product-cards">
                    <div className="product-card">
                        <img src={fish} alt="Supplements" />
                        <h3>Omega-3 Fish Oil</h3>
                        <p>Boost your performance with top-notch supplements.</p>
                        <button onClick={() => navigate("/omega")}>Details</button>
                    </div>
                    <div className="product-card">
                        <img src={whey} alt="Supplements" />
                        <h3>Whey Protein</h3>
                        <p>High-quality whey protein for muscle growth and recovery.</p>
                        <button onClick={() => navigate("/whey")}>Details</button>
                    </div>
                    <div className="product-card">
                        <img src={crea} alt="Supplements" />
                        <h3>Creatine</h3>
                        <p>Enhance strength and endurance with premium creatine.</p>
                        <button onClick={() => navigate("/creatine")}>Details</button>
                    </div>
                    <div className="product-card">
                        <img src={bcaa} alt="Supplements" />
                        <h3>BCAA</h3>
                        <p>The branched-chain amino acids (BCAAs)</p>
                        <button onClick={() => navigate("/bcaa")}>Details</button>
                    </div>
                    <div className="product-card">
                        <img src={caff} alt="Supplements" />
                        <h3>Caffine</h3>
                        <p> keep awake when you experience tiredness or weakness.</p>
                        <button onClick={() => navigate("/caffine")}>Details</button>
                    </div>
                    <div className="product-card">
                        <img src={mv} alt="Supplements" />
                        <h3>Multi Vitamins</h3>
                        <p> Multivitamins can provide essential nutrients to gym-goers to support their health and performance.</p>
                        <button onClick={() => navigate("/mv")}>Details</button>
                    </div>
                    <div className="product-card">
                        <img src={electro} alt="Supplements" />
                        <h3>Electrolytes</h3>
                        <p> Electrolytes like calcium and magnesium are crucial for muscle contraction and relaxation. </p>
                        <button onClick={() => navigate("/el")}>Details</button>
                    </div>


                </div>
            </section>

            <footer class="footer-section">
    <div class="contact-info">
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

                     
        <div class="social-icons">
            <a href="#" class="social-icon">Instagram</a>
            <a href="#" class="social-icon">Facebook</a>
            <a href="#" class="social-icon">Twitter</a>
        </div>
    </div>


    <div class="copyright">
        <p>&copy; 2025 Xtream Gym. All Rights Reserved.</p>
    </div>
</footer>

        </>
    )
}

export default product