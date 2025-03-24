import "../styles/admin.css";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import { db } from "../firebase/firebase.js";
import { collection, getDocs, updateDoc, deleteDoc, doc } from "firebase/firestore";
import { getAuth, deleteUser } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PieChart, Pie, Tooltip, Cell,} from "recharts";


const AdminDashboard = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [payments, setPayments] = useState([]);
  const [feedbacks, setFeedbacks] = useState([]);
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#A569BD", "#E74C3C", "#17A589", "#F1C40F"];

  
  useEffect(() => {
    const fetchUsers = async () => {
      const usersCollection = collection(db, "users");
      const userSnapshot = await getDocs(usersCollection);
      const userList = userSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setUsers(userList);
    };
    fetchUsers();
  }, []);

  useEffect(() => {
    const fetchPayments = async () => {
      const paymentsCollection = collection(db, "payments");
      const paymentSnapshot = await getDocs(paymentsCollection);
      const paymentList = paymentSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setPayments(paymentList);
    };
    fetchPayments();
  }, []);

  const updateUser = async (id, newEmail) => {
    const userDoc = doc(db, "users", id);
    await updateDoc(userDoc, { email: newEmail });
    setUsers(users.map((user) => (user.id === id ? { ...user, email: newEmail } : user)));
  };

  const deleteUserAccount = async (id) => {
  try {
    // Delete from Firestore
    await deleteDoc(doc(db, "users", id));
    setUsers(users.filter((user) => user.id !== id));

    // Call backend to delete user from Firebase Authentication
    const response = await fetch("http://localhost:5000/deleteUser", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ uid: id }),
    });

    const data = await response.json();
    if (response.ok) {
      console.log("User deleted from Firebase Authentication:", data.message);
    } else {
      console.error("Error deleting user:", data.error);
      alert("Failed to delete user from authentication.");
    }
  } catch (error) {
    console.error("Error deleting user:", error);
  }
};


  const deletePayment = async (id) => {
    await deleteDoc(doc(db, "payments", id));
    setPayments(payments.filter((payment) => payment.id !== id));
  };

  const generateReport = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("Gym Report", 14, 10);
  
    // Users Report
    doc.setFontSize(12);
    doc.text("Users Report", 14, 20);
    const userTableData = users.map((user) => [user.id, user.email]);
    doc.autoTable({ startY: 25, head: [["User ID", "Email"]], body: userTableData, theme: "grid" });
  
    let finalY = doc.lastAutoTable.finalY + 10;
  
    // Paid Members Report
    doc.text("Paid Members Report", 14, finalY);
    const paymentTableData = payments.map((payment) => [
      payment.email,
      payment.name,
      payment.phone,
      payment.packageType,
      String(payment.amount),
      payment.paymentId,
    ]);
    doc.autoTable({ startY: finalY + 5, head: [["Email", "Name", "Phone", "Package Type", "Amount", "Payment ID"]], body: paymentTableData, theme: "grid" });
  
    finalY = doc.lastAutoTable.finalY + 10;
  
    // Feedback Report
    doc.text("User Feedback Report", 14, finalY);
    const feedbackTableData = feedbacks.map((feedback) => [
      feedback.email,
      feedback.feedback,
      feedback.createdAt?.toDate().toLocaleString() || "N/A",
    ]);
    doc.autoTable({ startY: finalY + 5, head: [["Email", "Message", "Submitted At"]], body: feedbackTableData, theme: "grid" });
  
    doc.save("gym_report.pdf");
  };
  

   useEffect(() => {
    const fetchFeedbacks = async () => {
      const feedbackCollection = collection(db, "feedback");
      const feedbackSnapshot = await getDocs(feedbackCollection);
      const feedbackList = feedbackSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setFeedbacks(feedbackList);
    };
    fetchFeedbacks();
  }, []);

  const deleteFeedback = async (id) => {
    await deleteDoc(doc(db, "feedback", id));
    setFeedbacks(feedbacks.filter((feedback) => feedback.id !== id));
  };

  const packageDistribution = () => {
    const packageCount = payments.reduce((acc, payment) => {
      acc[payment.packageType] = (acc[payment.packageType] || 0) + 1;
      return acc;
    }, {});

    return Object.keys(packageCount).map((key, index) => ({
      name: key,
      value: packageCount[key],
    }));
  };



  return (
    <div className="admin-container">
      <nav className="admin-navbar">
        <h1 className="admin-title">Admin Panel</h1>
        <div className="admin-links">
          <a className="admin-link">User</a>
          <a className="admin-link" onClick={() => navigate("/trainer")}>Trainer</a>
          <a className="admin-link" onClick={() => navigate("/bl")}>Blogs</a>
        </div>
      </nav>
      <div className="admin-content">
        <h2 className="admin-heading">Admin Dashboard</h2>
      </div>
      <div className="admin-users-container">
        <h2 className="admin-users-title">Admin - Manage Users</h2>
        <table className="admin-users-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.email}</td>
                <td>
                  <button onClick={() => updateUser(user.id, prompt("New email:", user.email))} className="admin-edit-button">Edit</button>
                  <button onClick={() => deleteUserAccount(user.id)} className="admin-delete-button">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="admin-payments-container">
        <h2 className="admin-payments-title">Admin - Manage Gym Members</h2>
        <table className="admin-payments-table">
          <thead>
            <tr>
              <th>Email</th>
              <th>Name</th>
              <th>Phone</th>
              <th>Package Type</th>
              <th>Amount</th>
              <th>Payment ID</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment) => (
              <tr key={payment.id}>
                <td>{payment.email}</td>
                <td>{payment.name}</td>
                <td>{payment.phone}</td>
                <td>{payment.packageType}</td>
                <td>{payment.amount}</td>
                <td>{payment.paymentId}</td>
                <td>
                  <button onClick={() => deletePayment(payment.id)} className="admin-delete-button">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div>
        <h2 className="admin-payments-title">User Feedback</h2>
        {feedbacks.length === 0 ? (
          <p>No feedback available.</p>
        ) : (
          <table className="admin-feedback-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Email</th>
                <th>Message</th>
                <th>Submitted At</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {feedbacks.map((feedback) => (
                <tr key={feedback.id}>
                  <td>{feedback.id}</td>
                  <td>{feedback.email}</td>
                  <td>{feedback.feedback}</td>
                  <td>{feedback.createdAt?.toDate().toLocaleString() || "N/A"}</td>
                  <td>
                    <button onClick={() => deleteFeedback(feedback.id)} className="admin-delete-button">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <div className="admin-report-section">
        <button onClick={generateReport} className="admin-report-button">Generate Report</button>
      </div>

      <div className="admin-chart-container">
        <h2 className="admin-chart-title">Membership Package Distribution</h2>
        <PieChart width={400} height={400}>
          <Pie
            data={packageDistribution()}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
            outerRadius={150}
            fill="#8884d8"
            dataKey="value"
          >
            {packageDistribution().map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </div>
    </div>
  );
};

export default AdminDashboard;