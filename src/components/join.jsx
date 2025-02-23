import React, { useState, useEffect } from "react";
import "../styles/join.css";
import Payment from "./payment";
import { auth } from "../firebase/firebase.js";  // Import Firebase auth
import { onAuthStateChanged } from "firebase/auth";

function RegistrationForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    age: "",
    gender: "",
    package: "",
    training: "",
  });

  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    // Get logged-in user email
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserEmail(user.email);
      } else {
        setUserEmail("");
      }
    });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="register-container">
      <h2>Join Xtream Gym</h2>
      <form className="register-form">
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="tel"
          name="phone"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="age"
          placeholder="Age"
          value={formData.age}
          onChange={handleChange}
          required
        />
        <select name="gender" value={formData.gender} onChange={handleChange} required>
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
        <select name="package" value={formData.package} onChange={handleChange} required>
          <option value="">Select Package</option>
          <option value="Basic - Yoga & Cardio">Basic - 1000 Rs/M Yoga & Cardio</option>
          <option value="Standard - Weight Loss">Standard - 2000 Rs/M Weight Loss</option>
          <option value="Premium - Body Building & HyperTrophy">Premium - 3000 Rs/M Body Building & HyperTrophy</option>
          <option value="ex">Ex- 5 rs</option>
        </select>
        <select name="training" value={formData.training} onChange={handleChange} required>
          <option value="">Select Training Type</option>
          <option value="Personal Training">Personal Training</option>
          <option value="Group Training">Group Training</option>
        </select>
      </form>

      {/* Pass extra details to Payment Component */}
      <Payment 
        packageType={formData.package} 
        userEmail={userEmail} 
        userName={formData.name} 
        userPhone={formData.phone}
      />

      <button onClick={() => window.history.back()} className="jb2">Go Back</button>
    </div>
  );
}

export default RegistrationForm;