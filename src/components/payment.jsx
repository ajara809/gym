import React, { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { collection, addDoc } from "firebase/firestore";
import { auth, db } from "../firebase/firebase.js";
import jsPDF from "jspdf";
import "jspdf-autotable";

const Payment = ({ packageType, userEmail, userName, userPhone }) => {
  const [loggedInEmail, setLoggedInEmail] = useState("");
  const [paymentDetails, setPaymentDetails] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setLoggedInEmail(user.email);
      }
    });
  }, []);

  const loadScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const getPackageAmount = () => {
    switch (packageType) {
      case "Basic - Yoga & Cardio":
        return 1000 * 100;
      case "Standard - Weight Loss":
        return 2000 * 100;
      case "Premium - Body Building & HyperTrophy":
        return 3000 * 100;
      case "ex":
        return 1 * 100;
      default:
        return 0;
    }
  };

  const handlePayment = async () => {
    const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");

    if (!res) {
      alert("Razorpay SDK failed to load.");
      return;
    }

    if (!loggedInEmail) {
      alert("You must be logged in to proceed with payment.");
      return;
    }

    const paymentDate = new Date();
    const renewalDate = new Date(paymentDate);
    renewalDate.setMonth(renewalDate.getMonth() + 1); // Add 1 month for renewal

    const options = {
      key: "rzp_live_PRUoYWVTOH10qW",
      amount: getPackageAmount(),
      currency: "INR",
      name: "Xtream Gym",
      description: `${packageType} Package Payment`,
      handler: async function (response) {
        console.log("Payment Successful! Response:", response);
        alert(`Payment Successful! Payment ID: ${response.razorpay_payment_id}`);

        // Store payment details in Firestore
        try {
          const docRef = await addDoc(collection(db, "payments"), {
            email: loggedInEmail,
            name: userName,
            phone: userPhone,
            packageType: packageType,
            amount: getPackageAmount() / 100,
            paymentId: response.razorpay_payment_id,
            paymentDate: paymentDate.toISOString(),
            renewalDate: renewalDate.toISOString(),
            timestamp: new Date(),
          });

          console.log("Payment details saved successfully in Firestore!");
          alert("Payment details saved successfully!");

          // Store payment details in state for PDF generation
          setPaymentDetails({
            name: userName,
            email: loggedInEmail,
            phone: userPhone,
            package: packageType,
            amount: getPackageAmount() / 100,
            paymentId: response.razorpay_payment_id,
            paymentDate: paymentDate.toLocaleDateString(),
            renewalDate: renewalDate.toLocaleDateString(),
          });
        } catch (error) {
          console.error("Error saving payment:", error);
        }
      },
      prefill: {
        email: loggedInEmail,
      },
      theme: {
        color: "#3399cc",
      },
    };

    if (getPackageAmount() === 0) {
      alert("Please select a valid package.");
      return;
    }

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  const generatePDF = () => {
    if (!paymentDetails) return;

    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("Xtream Gym - Payment Invoice", 20, 20);

    doc.setFontSize(12);
    doc.text(`Invoice Date: ${paymentDetails.paymentDate}`, 20, 30);

    doc.autoTable({
      startY: 40,
      head: [["Field", "Details"]],
      body: [
        ["Name", paymentDetails.name],
        ["Email", paymentDetails.email],
        ["Phone", paymentDetails.phone],
        ["Package", paymentDetails.package],
        ["Amount Paid", paymentDetails.amount],
        ["Payment ID", paymentDetails.paymentId],
        ["Payment Date", paymentDetails.paymentDate],
        ["Fees Renewal Date", paymentDetails.renewalDate],
      ],
    });

    doc.save(`Invoice_${paymentDetails.paymentId}.pdf`);
  };

  return (
    <div>
      <button
        onClick={handlePayment}
        style={{ marginLeft: "197px", marginTop: "20px", backgroundColor: "#ff6347", color: "#fff" }}
      >
        Pay Now
      </button>

      {paymentDetails && (
        <button
          onClick={generatePDF}
          style={{ marginLeft: "20px", marginTop: "20px", backgroundColor: "#28a745", color: "#fff" }}
        >
          Generate Invoice
        </button>
      )}
    </div>
  );
};

export default Payment;
