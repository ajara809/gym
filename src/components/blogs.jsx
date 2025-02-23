import React, { useState, useEffect } from "react";
import "../styles/blogs.css";
import "../styles/home.css"
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebase.js"; 
import { Link } from 'react-router-dom';

function Blog() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      const blogsCollection = collection(db, "blogs");
      const blogSnapshot = await getDocs(blogsCollection);
      const blogList = blogSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setBlogs(blogList);
    };

    fetchBlogs();
  }, []);


  return (
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
        <h2>About Our Blogs</h2>
        <p>
          Stay updated with the latest fitness tips, nutrition advice, and
          workout trends from our expert trainers and contributors. Our blog
          section is designed to inspire and guide you on your fitness journey.
        </p>
      </section>

      <section className="blog-section">
        <h2>Featured Blogs</h2>
        <div className="blog-container">
          {blogs.length > 0 ? (
            blogs.map((blog) => (
              <div className="blog-card" key={blog.id}>
                <h3>{blog.title}</h3>
                <p>{blog.content}</p>
                <h3>Key Points:</h3>
                <ul>
                  {blog.keyPoints.map((point, i) => (
                    <li key={i}>{point}</li>
                  ))}
                </ul>
              </div>
            ))
          ) : (
            <p>Loading blogs...</p>
          )}
        </div>
      </section>
      
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


    <div class="copyright">
        <p>&copy; 2025 Xtream Gym. All Rights Reserved.</p>
    </div>
</footer>
    </>
  );
}

export default Blog;
