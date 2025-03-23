import React, { useState, useEffect } from "react";
import "../styles/join.css";
import Payment from "./payment";
import { auth, db } from "../firebase/firebase.js";
import { onAuthStateChanged } from "firebase/auth";
import { collection, query, where, getDocs } from "firebase/firestore";
import jsPDF from "jspdf";
import "jspdf-autotable";

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
  const [isPaid, setIsPaid] = useState(false);
  const [loading, setLoading] = useState(true);
  const [paymentDetails, setPaymentDetails] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUserEmail(user.email);
        checkPaymentStatus(user.email);
      } else {
        setUserEmail("");
        setLoading(false);
      }
    });
  }, []);

  const checkPaymentStatus = async (email) => {
    try {
      const paymentsRef = collection(db, "payments");
      const q = query(paymentsRef, where("email", "==", email));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const paymentData = querySnapshot.docs[0].data();
        setIsPaid(true);
        setPaymentDetails(paymentData);
      }
    } catch (error) {
      console.error("Error checking payment status:", error);
    }
    setLoading(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "phone" && !/^\d{0,10}$/.test(value)) return;
    if (name === "age" && (isNaN(value) || value > 99)) return;

    setFormData({ ...formData, [name]: value });
  };

  const generatePDF = () => {
    if (!paymentDetails) return;

    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("Xtream Gym - Payment Invoice", 20, 20);

    doc.setFontSize(12);
    doc.text(`Invoice Date: ${new Date(paymentDetails.timestamp.toDate()).toLocaleDateString()}`, 20, 30);

    doc.autoTable({
      startY: 40,
      head: [["Field", "Details"]],
      body: [
        ["Name", paymentDetails.name],
        ["Email", paymentDetails.email],
        ["Phone", paymentDetails.phone],
        ["Package", paymentDetails.packageType],
        ["Amount Paid", paymentDetails.amount],
        ["Payment ID", paymentDetails.paymentId],
        ["Payment Date", new Date(paymentDetails.timestamp.toDate()).toLocaleDateString()],
        ["Fees Renewal Date", new Date(paymentDetails.timestamp.toDate()).toLocaleDateString().replace(/\d+$/, (d) => +d + 30)], // Approximate renewal date
      ],
    });

    doc.save(`Invoice_${paymentDetails.paymentId}.pdf`);
  };

  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <div className="register-container">
      {isPaid ? (
        <>
          <h2>You have already paid.</h2>
          <button
            onClick={generatePDF}
            className="jb2"
          >
            Generate Invoice
          </button>
          <button onClick={() => window.history.back()} className="jb2">Go Back</button>
        </>
      ) : (
        <>
          <h2>Join Xtream Gym</h2>
          <form className="register-form">
            <input type="text" name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} required />
            <input type="email" name="email" placeholder="Email Address" value={formData.email} onChange={handleChange} required />
            <input type="tel" name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleChange} required maxLength="10" />
            <input type="number" name="age" placeholder="Age" value={formData.age} onChange={handleChange} required min="1" max="99" />
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
              <option value="ex">Ex- 1 rs</option>
            </select>
            <select name="training" value={formData.training} onChange={handleChange} required>
              <option value="">Select Training Type</option>
              <option value="Personal Training">Personal Training</option>
              <option value="Group Training">Group Training</option>
            </select>
          </form>

          {/* Payment Component */}
          <Payment packageType={formData.package} userEmail={userEmail} userName={formData.name} userPhone={formData.phone} />

          <button onClick={() => window.history.back()} className="jb2">Go Back</button>
        </>
      )}
    </div>
  );
}

export default RegistrationForm;
