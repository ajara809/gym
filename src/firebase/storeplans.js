import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase/firebase.js";

const storePlans = async () => {
  const plans = [
    {
      title: "Basic Plan",
      price: "1000 Rs/month",
      features: ["Access to gym facilities", "Yoga & Cardio Classes"],
    },
    {
      title: "Standard Plan",
      price: "2000 Rs/month",
      features: ["Access to gym facilities", "Weight Loss"],
    },
    {
      title: "Premium Plan",
      price: "3000 Rs/month",
      features: ["Access to gym facilities", "Body Building & Hypertrophy"],
    },
  ];

  try {
    console.log("Connecting to Firestore...");
    const collectionRef = collection(db, "plans");

    for (const plan of plans) {
      console.log(`Adding: ${plan.title}`);
      const docRef = await addDoc(collectionRef, plan);
      console.log(`Plan added: ${plan.title} with ID: ${docRef.id}`);
    }

    console.log(" All plans stored successfully!");
  } catch (error) {
    console.error(" Error storing plans: ", error);
  }
};

storePlans();
