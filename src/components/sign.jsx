import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, sendEmailVerification, signOut } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../firebase/firebase.js"; 
import "../styles/login.css";

function Sign() {
  const [mail, setMail] = useState("");
  const [pass, setPass] = useState("");
  const [passc, setPassc] = useState("");
  const [error, setError] = useState(""); 
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault(); 
    if (pass !== passc) {
      setError("Passwords do not match!");
      return;
    }
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, mail, pass);
      const user = userCredential.user;

      await sendEmailVerification(user);
      console.log("Verification email sent!");

      // Log out user after sending the verification email
      await signOut(auth);

      setError("Account created! Please verify your email before logging in.");
    } catch (error) {
      console.error("Error during account creation:", error);
      if (error.code === "auth/email-already-in-use") {
        setError("Email already in use!");
      } else if (error.code === "auth/weak-password") {
        setError("Password must be at least 6 characters!");
      } else if (error.message.includes("FirebaseError: Missing or insufficient permissions")) {
        setError("Database permissions issue!");
      } else {
        setError("Error creating account. Try again!");
      }
    }
  };

  return (
    <form onSubmit={handleSignUp}> 
      <div className="d1">
        <center>
          <h1 id="sih1">Sign Up</h1>
        </center>
        <h3 id="sih3">Email</h3>
        <input
          type="email"
          id="inp3"
          required
          placeholder="Enter Your Email"
          value={mail}
          onChange={(e) => setMail(e.target.value)} 
        />
        <h3 className="h1" id="sih3">Create Password</h3>
        <input
          type="password"
          required
          id="inp1"
          placeholder="Enter a Password"
          value={pass}
          onChange={(e) => setPass(e.target.value)} 
        />
        <h3 id="sih3">Re-Enter a Password</h3>
        <input
          type="password"
          required
          id="inp2"
          placeholder="Re-Enter a Password"
          value={passc}
          onChange={(e) => setPassc(e.target.value)} 
        />
        <p className="p" style={{ color: "red", fontWeight:"bolder" }}>{error} </p>
        <center>
          <button id="but1" type="submit"> 
           Submit
          </button>
          <p onClick={() => navigate("/login")} id="sip">
            Already have an account? Login
          </p>
        </center>
      </div>
    </form>
  );
}

export default Sign;
