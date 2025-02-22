import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase/firebase.js";

// Sample blogs data
const blogs = [
  {
    title: "The Importance of Nutrition",
    content: "Learn how balanced nutrition can enhance your workout results and overall health.",
    keyPoints: [
      "Eat a balanced diet rich in proteins, carbs, and fats.",
      "Stay hydrated to support metabolism and muscle function.",
      "Consume essential vitamins and minerals for better recovery.",
      "Time your meals properly to maximize energy levels.",
      "Avoid processed foods to maintain a healthy gut."
    ]
  },
  {
    title: "Top 5 Cardio Workouts",
    content: "Discover the best cardio exercises to improve your heart health and burn calories.",
    keyPoints: [
      "Running improves endurance and cardiovascular health.",
      "Jump rope burns calories quickly and enhances coordination.",
      "Cycling strengthens leg muscles and improves stamina.",
      "Swimming is a full-body workout that's easy on joints.",
      "Rowing builds both upper body strength and heart health."
    ]
  },
  {
    title: "Strength Training for Beginners",
    content: "A beginner's guide to building muscle and strength effectively and safely.",
    keyPoints: [
      "Start with bodyweight exercises before lifting heavy weights.",
      "Focus on proper form to prevent injuries.",
      "Increase resistance gradually to challenge your muscles.",
      "Rest between sets to allow muscle recovery.",
      "Maintain consistency to see long-term progress."
    ]
  },
  {
    title: "Recovery and Rest Days",
    content: "Understand the importance of rest days and how they contribute to better fitness results.",
    keyPoints: [
      "Rest days help muscles recover and grow.",
      "Adequate sleep is crucial for muscle repair.",
      "Stretching improves flexibility and reduces soreness.",
      "Hydration speeds up muscle recovery.",
      "Active recovery, like light walking, keeps blood circulation steady."
    ]
  },
  {
    title: "Best Supplements for Muscle Growth",
    content: "Explore the most effective supplements to enhance muscle gain and performance.",
    keyPoints: [
      "Protein powders help meet daily protein needs for muscle repair.",
      "Creatine enhances strength and improves workout performance.",
      "BCAAs (Branched-Chain Amino Acids) support muscle recovery.",
      "Omega-3 fatty acids reduce inflammation and improve joint health.",
      "Multivitamins ensure you get essential nutrients missing from your diet."
    ]
  },
  {
    title: "How to Stay Motivated in Fitness",
    content: "Tips to keep yourself motivated and consistent in your fitness journey.",
    keyPoints: [
      "Set realistic and achievable fitness goals.",
      "Track progress to stay motivated and accountable.",
      "Find a workout partner or join a fitness community.",
      "Try new workout routines to keep things interesting.",
      "Reward yourself for reaching fitness milestones."
    ]
  }
];

// Function to store blogs in Firestore
const storeBlogs = async () => {
  const blogsCollection = collection(db, "blogs");

  try {
    for (const blog of blogs) {
      await addDoc(blogsCollection, blog);
      console.log(`Blog "${blog.title}" added successfully`);
    }
    console.log("All blogs added successfully!");
  } catch (error) {
    console.error("Error adding blogs:", error);
  }
};

// Run the function
storeBlogs();
