import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase/firebase.js";


const storeTrainerData = async (trainerName, description) => {
  try {
    const docRef = await addDoc(collection(db, "trainers"), {
      name: trainerName,
      description: description
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

// Call the function to store data
storeTrainerData("Raja", "Raja is a certified fitness expert with over 10 years of experience in weight training and bodybuilding. He specializes in helping clients achieve their strength goals and improve overall physical fitness.");
storeTrainerData("Santhosh", "Santhosh is a yoga and wellness coach with a passion for holistic health. With 8 years of experience, she guides clients through yoga, flexibility training, and mindfulness techniques to achieve balance and well-being.");
