import { collection, addDoc, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebase.js";

const scheduleData = [
  { className: "Weight Loss", day: "Monday", time: "10:00 AM - 11:00 AM" },
  { className: "Yoga", day: "Tuesday", time: "8:00 AM - 9:00 AM" },
  { className: "Cardio", day: "Wednesday", time: "6:00 PM - 7:00 PM" },
  { className: "Body Building", day: "Thursday", time: "5:00 PM - 6:00 PM" },
  { className: "Hypertrophy", day: "Friday", time: "4:00 PM - 5:00 PM" },
  { className: "Cycling", day: "Saturday", time: "7:00 AM - 8:00 AM" }
];

const storeSchedule = async () => {
  const existingDocs = await getDocs(collection(db, "classSchedules"));
  
  if (!existingDocs.empty) {
    console.log("Schedule already exists in Firestore.");
    return;
  }

  for (let schedule of scheduleData) {
    await addDoc(collection(db, "classSchedules"), schedule);
  }

  console.log("Class schedule successfully stored in Firestore.");
};

storeSchedule();
