import React, { useEffect, useState } from "react";
import { db } from "../firebase/firebase.js";
import { collection, getDocs, updateDoc, deleteDoc, doc, addDoc } from "firebase/firestore";
import "../styles/trainers.css";

const AdminTrainers = () => {
  const [trainers, setTrainers] = useState([]);
  const [newTrainer, setNewTrainer] = useState({ name: "", description: "" });

  // Fetch trainers from Firestore
  useEffect(() => {
    const fetchTrainers = async () => {
      const trainersCollection = collection(db, "trainers");
      const trainerSnapshot = await getDocs(trainersCollection);
      const trainerList = trainerSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setTrainers(trainerList);
    };

    fetchTrainers();
  }, []);

  // Add a new trainer
  const addTrainer = async () => {
    if (!newTrainer.name || !newTrainer.description) {
      alert("Please fill in all fields.");
      return;
    }

    const trainerRef = await addDoc(collection(db, "trainers"), newTrainer);
    setTrainers([...trainers, { id: trainerRef.id, ...newTrainer }]);
    setNewTrainer({ name: "", description: "" });
  };

  // Update a trainer
  const updateTrainer = async (id, name, description) => {
    const newName = prompt("Update name:", name);
    const newDescription = prompt("Update description:", description);

    if (newName && newDescription) {
      const updatedData = { name: newName, description: newDescription };
      await updateDoc(doc(db, "trainers", id), updatedData);
      setTrainers(trainers.map(trainer => (trainer.id === id ? { id, ...updatedData } : trainer)));
    }
  };

  // Delete a trainer
  const deleteTrainer = async (id) => {
    await deleteDoc(doc(db, "trainers", id));
    setTrainers(trainers.filter(trainer => trainer.id !== id));
  };

  return (
    <div className="admin-trainers-container">
      <h2 className="admin-trainers-title">Admin - Manage Trainers</h2>

      <div className="add-trainer-form">
        <input
          type="text"
          placeholder="Trainer Name"
          value={newTrainer.name}
          onChange={(e) => setNewTrainer({ ...newTrainer, name: e.target.value })}
        />
        <textarea
          placeholder="Trainer Description"
          value={newTrainer.description}
          onChange={(e) => setNewTrainer({ ...newTrainer, description: e.target.value })}
        />
        <button onClick={addTrainer} className="add-trainer-button">Add Trainer</button>
      </div>
      <button onClick={() => window.history.back()}>Go Back</button>


      <table className="admin-trainers-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {trainers.map(trainer => (
            <tr key={trainer.id}>
              <td>{trainer.name}</td>
              <td>{trainer.description}</td>
              <td>
                <button onClick={() => updateTrainer(trainer.id, trainer.name, trainer.description)} className="edit-button">Edit</button>
                <button onClick={() => deleteTrainer(trainer.id)} className="delete-button">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminTrainers;
