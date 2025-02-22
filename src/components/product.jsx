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
import res from './images/res.jpg'
import mat from './images/mat.jpg'
import tread from './images/tread.jfif'
import dumbell from './images/dumbell.jpg'
import kettle from './images/kettle.jpg'

function product(){
    const navigate = useNavigate();
    return(
        <>
          <nav>
             <div class="logo">Xtream Gym</div>
             <div class="nav-links">
             <Link to="/home"><a href="#classes">Home</a></Link>
            <Link to="/class"><a href="#classes">Classes</a></Link>
            <Link to="/product"><a href="#products">Products</a></Link>
            <Link to="/blog"><a href="#products">Blogs</a></Link>
            <a href="#join">Join Us</a>
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

            {/* <section className="workout-products-section">
                <h2>Common Workout Products</h2>
                <div className="product-cards">
                    <div className="product-card">
                        <img src={mat} alt="Supplements" />
                        <h3>Yoga Mat</h3>
                        <p>Comfortable and durable yoga mats for your practice.</p>
                        <button>Pre-book Now</button>
                    </div>
                    <div className="product-card">
                        <img src={res} alt="Supplements" />
                        <p>Strengthen your muscles with versatile resistance bands.</p>
                        <button>Pre-book Now</button>
                    </div>
                </div>
            </section> */}
            <footer class="footer-section">
    <div class="contact-info">
        <h3>Contact Us</h3>
        <p>Phone: +91 7397177540</p>
        <p>Email: xtream411@gmail.com</p>
        <div class="social-icons">
            <a href="#" class="social-icon">Instagram</a>
            <a href="#" class="social-icon">Facebook</a>
            <a href="#" class="social-icon">Twitter</a>
        </div>
    </div>

    <div class="feedback-section">
        <h3>Feedback</h3>
        <form action="#" method="POST">
            <textarea name="feedback" placeholder="Your feedback" rows="4" required></textarea>
            <button type="submit">Submit</button>
        </form>
    </div>

    <div class="copyright">
        <p>&copy; 2025 Xtream Gym. All Rights Reserved.</p>
    </div>
</footer>

        </>
    )
}

export default product