import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebase.js";
import { getAuth, onAuthStateChanged } from "firebase/auth";

function AttendanceProgress() {
    const auth = getAuth();
    const [user, setUser] = useState(null);
    const [attendance, setAttendance] = useState({});
    const [progress, setProgress] = useState("");
    const [isPaidMember, setIsPaidMember] = useState(false);
    const [loading, setLoading] = useState(true);  // Loading state

   useEffect(() => {
           console.log("🔍 Checking Firebase authentication...");
       
           const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
               if (currentUser) {
                   console.log("✅ User logged in:");
                   console.log("   Email:", currentUser.email);
                   console.log("   UID:", currentUser.uid);
       
                   const token = await currentUser.getIdTokenResult();
                   console.log("🔥 Firebase Token Claims:", token.claims);
       
                   setUser(currentUser);
                   checkUserPayment(currentUser.email);
                   fetchAttendance(currentUser.email);
                   fetchProgress(currentUser.email);
               } else {
                   console.log("❌ No user found.");
                   setLoading(false);
               }
           });
       
           return () => unsubscribe();
       }, []);
       

    const checkUserPayment = async (email) => {
            try {
                console.log("Checking if user is a paid member with email:", email);
        
                const paymentsCollection = collection(db, "payments");
                const paymentSnapshot = await getDocs(paymentsCollection);
        
                // 🔍 Find a payment document where the `email` matches
                const paidUser = paymentSnapshot.docs.find(doc => doc.data().email === email);
        
                if (paidUser) {
                    console.log("User is a paid member:", paidUser.data());
                    setIsPaidMember(true);
                    fetchAttendance(email);
                    fetchProgress(email);
                } else {
                    console.log("User is NOT a paid member.");
                    setIsPaidMember(false);
                }
            } catch (error) {
                console.error("Error checking payment status:", error);
            } finally {
                setLoading(false);
            }
        };
        
        
        const fetchAttendance = async (email) => {
            try {
                console.log(`🔍 Fetching attendance for user: ${email}`);
        
                const attendanceCollection = collection(db, "attendance"); 
                const attendanceSnapshot = await getDocs(attendanceCollection);
        
                // 🔍 Find the document where `email` matches
                const attendanceDoc = attendanceSnapshot.docs.find(doc => doc.data().email === email);
        
                if (attendanceDoc) {
                    console.log("✅ Attendance data found:", attendanceDoc.data());
                    setAttendance(attendanceDoc.data());
                } else {
                    console.log("❌ No attendance found for:", email);
                }
            } catch (error) {
                console.error("🚨 Error fetching attendance:", error);
            }
        };
        
        
        const fetchProgress = async (email) => {
            try {
                console.log(`Fetching progress for user with email: ${email}`);
        
                const progressCollection = collection(db, "progress");
                const progressSnapshot = await getDocs(progressCollection);
        
                // 🔍 Find the document where the email matches
                const progressDoc = progressSnapshot.docs.find(doc => doc.data().email === email);
        
                if (progressDoc) {
                    console.log("✅ Progress message found:", progressDoc.data().progressMessage);
                    setProgress(progressDoc.data().progressMessage);
                } else {
                    console.log("❌ No progress message found for email:", email);
                }
            } catch (error) {
                console.error("⚠️ Error fetching progress:", error);
            }
        };


    return (
        <section className="attendance-progress-section">
            {loading ? (
                <p>Loading...</p> // Show loading message while waiting for data
            ) : user ? (
                isPaidMember ? (
                    <section className="attendance-container">
                        <h2>Your Weekly Attendance</h2>
                        <ul className="attendance-list">
                            {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"].map((day) => (
                                <li key={day}>
                                    {day}: {attendance[day] || "No record"}
                                </li>
                            ))}
                        </ul>

                        <h2>Your Monthly Progress</h2>
                        <p className="progress-message">{progress || "No progress updates yet."}</p>
                        <button onClick={() => window.history.back()} className="">Go Back</button>
                    </section>
                ) : (
                    <section className="attendance-progress-section">
                        <h2>Attendance Not Available</h2>
                        <p>You must be a paid member to access attendance and progress updates.</p>
                        <button onClick={() => window.history.back()} className="">Go Back</button>
                    </section>
                )
            ) : (
                <p>Please log in to view attendance.</p> // Show message if user isn't logged in
            )}

        </section>
    );
}

export default AttendanceProgress;
