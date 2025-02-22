import React, { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { collection, addDoc } from "firebase/firestore";
import { auth, db } from "../firebase/firebase.js";


const Payment = ({ packageType, userEmail, userName, userPhone }) => {
  const [loggedInEmail, setLoggedInEmail] = useState("");

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
      case "Basic":
        return 1000 * 100;
      case "Standard":
        return 2000 * 100;
      case "Premium":
        return 3000 * 100;
      case "ex":
        return 5 * 100;
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

    const options = {
      key: "rzp_test_6QaZLpIJtn9Qas",
      amount: getPackageAmount(),
      currency: "INR",
      name: "Xtream Gym",
      description: `${packageType} Package Payment`,
      handler: async function (response) {
        console.log("Payment Successful! Response:", response);
        alert(`Payment Successful! Payment ID: ${response.razorpay_payment_id}`);

        // Store payment details in Firestore
        try {
          await addDoc(collection(db, "payments"), {
            email: loggedInEmail,
            name: userName,
            phone: userPhone,
            packageType: packageType,
            amount: getPackageAmount() / 100,
            paymentId: response.razorpay_payment_id,
            timestamp: new Date(),
          });

          console.log("Payment details saved successfully in Firestore!");
          alert("Payment details saved successfully!");
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

  return (
    <div>
      <button onClick={handlePayment} style={{ marginLeft:"197px", marginTop:"20px", backgroundColor: "#ff6347", color: "#fff" }}>
        Pay Now
      </button>
    </div>
  );
};

export default Payment;
