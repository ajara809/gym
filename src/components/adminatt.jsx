import { collection, getDocs, setDoc, doc } from "firebase/firestore";
import {  query, where, getDoc } from "firebase/firestore";
import { db } from "../firebase/firebase.js";
import React, { useEffect, useState } from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";


const AdminDashboard = () => {
  const [members, setMembers] = useState([]);
  const [progressMessages, setProgressMessages] = useState({});

  useEffect(() => {
    const fetchMembers = async () => {
      const paymentsCollection = collection(db, "payments"); // Fetch only gym members
      const paymentSnapshot = await getDocs(paymentsCollection);
      
      const memberList = await Promise.all(paymentSnapshot.docs.map(async (doc) => {
        const memberData = { id: doc.id, ...doc.data() };
        
        try {
          // 🔍 Fetch attendance based on the user's email
          const attendanceQuery = query(collection(db, "attendance"), where("email", "==", memberData.email));
          const attendanceSnap = await getDocs(attendanceQuery);
          
          if (!attendanceSnap.empty) {
            const attendanceData = attendanceSnap.docs[0].data();
            console.log(`✅ Attendance for ${memberData.email}:`, attendanceData);
            memberData.attendance = attendanceData; // ✅ Assign attendance data
          } else {
            console.log(`❌ No attendance found for ${memberData.email}`);
            memberData.attendance = {}; // Assign empty object if no attendance exists
          }
        } catch (error) {
          console.error(`⚠️ Error fetching attendance for ${memberData.email}:`, error);
          memberData.attendance = {};
        }
  
        return memberData;
      }));
  
      setMembers(memberList);
    };
  
    fetchMembers();
  }, []);
  
  
  const markAttendance = async (member, status) => {
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const today = new Date();
    const weekday = daysOfWeek[today.getDay()]; // Get current weekday (e.g., Monday)
  
    if (weekday === "Sunday") {
      alert("No attendance on Sunday!");
      return;
    }
  
    const attendanceRef = doc(db, "attendance", member.id);
  
    try {
      await setDoc(attendanceRef, 
        { 
          [weekday]: status, // Store attendance under the weekday
          name: member.name, 
          email: member.email 
        }, 
        { merge: true }
      );
      alert(`Marked ${member.name} as ${status} on ${weekday}`);
    } catch (error) {
      console.error("Error updating attendance:", error);
      alert("Failed to update attendance. Check Firestore rules.");
    }
  };
  

  const sendProgressMessage = async (member, message) => {
    const today = new Date().toISOString().split("T")[0];
    const progressRef = doc(db, "progress", member.id);

    try {
      await setDoc(progressRef, 
        { 
          date: today, 
          progressMessage: message,
          name: member.name,
          email: member.email
        }, 
        { merge: true }
      );
      alert(`Progress message sent to ${member.name}`);
    } catch (error) {
      console.error("Error sending progress message:", error);
      alert("Failed to send progress message. Check Firestore rules.");
    }
  };

  const generatePDF = () => {
    console.log("🔍 Members Data:", members); // Debugging Log
  
    const doc = new jsPDF();
    doc.text("Gym Attendance Report", 14, 10);
  
    const tableColumn = ["Name", "Email", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const tableRows = [];
  
    members.forEach((member) => {
      console.log(`🔍 Checking attendance for ${member.name}:`, member.attendance); // Debugging Log
  
      tableRows.push([
        member.name,
        member.email,
        member.attendance?.Monday || "N/A",
        member.attendance?.Tuesday || "N/A",
        member.attendance?.Wednesday || "N/A",
        member.attendance?.Thursday || "N/A",
        member.attendance?.Friday || "N/A",
        member.attendance?.Saturday || "N/A",
      ]);
    });
  
    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 20,
    });
  
    doc.save("Gym_Attendance_Report.pdf");
  };
  
  return (
    <div className="attendance-progress-section">
      <h2>Manage Gym Member Attendance</h2>
          <table className="admin-users-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Monday</th>
                <th>Tuesday</th>
                <th>Wednesday</th>
                <th>Thursday</th>
                <th>Friday</th>
                <th>Saturday</th>
              </tr>
            </thead>
            <tbody>
              {members.map((member) => (
                <tr key={member.id}>
                  <td>{member.name}</td>
                  <td>{member.email}</td>
                  <td colSpan="6">
                    <button onClick={() => markAttendance(member, "Present")}>Present</button>
                    <button onClick={() => markAttendance(member, "Absent")}>Absent</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button onClick={generatePDF} className="generate-pdf-btn">
              Download Attendance Report
          </button>
      <h2>Send Progress Messages</h2>
      <table className="admin-users-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Progress Message</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {members.map((member) => (
            <tr key={member.id}>
              <td>{member.name}</td>
              <td>{member.email}</td>
              <td>
                <input
                  type="text"
                  placeholder="Enter progress update"
                  value={progressMessages[member.id] || ""}
                  onChange={(e) => setProgressMessages({ ...progressMessages, [member.id]: e.target.value })}
                />
              </td>
              <td>
                <button onClick={() => sendProgressMessage(member, progressMessages[member.id] || "No message entered")}>
                  Send
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={() => window.history.back()} className="btn">Go Back</button>
    </div>
  );
};

export default AdminDashboard;
