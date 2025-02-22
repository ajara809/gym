import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase/firebase.js";


const trainingPrograms = [
  { title: "Weight Loss", description: "Effective programs tailored to help you shed unwanted weight and stay fit." },
  { title: "Classic Yoga", description: "Experience the balance of mind and body through our traditional yoga classes." },
  { title: "Cardio", description: "High-energy cycling sessions to boost your stamina and cardiovascular health." },
  { title: "Body Building", description: "Build muscle strength and tone your body with our expert trainers." },
  { title: "Hypertrophy", description: "Specialized programs focusing on muscle growth and advanced training techniques." }
];

const storeTrainingPrograms = async () => {
  const trainingCollection = collection(db, "trainingPrograms");

  try {
    for (let program of trainingPrograms) {
      await addDoc(trainingCollection, program);
    }
    console.log("Training programs added successfully!");
  } catch (error) {
    console.error("Error adding training programs:", error);
  }
};

// Call this function only once to add the data
storeTrainingPrograms();
