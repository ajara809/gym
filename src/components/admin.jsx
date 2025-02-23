import '../styles/admin.css';
import { db } from "../firebase/firebase.js";
import { collection, getDocs, updateDoc, deleteDoc, doc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {

  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [payments, setPayments] = useState([]);

  // Fetch users from Firestore
  useEffect(() => {
    const fetchUsers = async () => {
      const usersCollection = collection(db, "users");
      const userSnapshot = await getDocs(usersCollection);
      const userList = userSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setUsers(userList);
    };

    fetchUsers();
  }, []);

  // Update user email
  const updateUser = async (id, newEmail) => {
    const userDoc = doc(db, "users", id);
    await updateDoc(userDoc, { email: newEmail });
    setUsers(users.map(user => (user.id === id ? { ...user, email: newEmail } : user)));
  };

  // Delete a user
  const deleteUser = async (id) => {
    await deleteDoc(doc(db, "users", id));
    setUsers(users.filter(user => user.id !== id));
  };

   // Fetch payments from Firestore
   useEffect(() => {
    const fetchPayments = async () => {
      const paymentsCollection = collection(db, "payments");
      const paymentSnapshot = await getDocs(paymentsCollection);
      const paymentList = paymentSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setPayments(paymentList);
    };

    fetchPayments();
  }, []);

  // Delete a payment
  const deletePayment = async (id) => {
    await deleteDoc(doc(db, "payments", id));
    setPayments(payments.filter(payment => payment.id !== id));
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
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.email}</td>
              <td>
                <button onClick={() => updateUser(user.id, prompt("New email:", user.email))} className="admin-edit-button">Edit</button>
                <button onClick={() => deleteUser(user.id)} className="admin-delete-button">Delete</button>
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
          {payments.map(payment => (
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
      
    </div>
  );
};

export default AdminDashboard;
