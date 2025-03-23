import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword, signOut, sendPasswordResetEmail } from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase/firebase.js"; // Adjust the path as needed
import "../styles/login.css";

function Login() {
  const navigate = useNavigate();
  const [mail, setMail] = useState("");
  const [pass, setPass] = useState("");
  const errorRef = useRef(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, mail, pass);
      const user = userCredential.user;

      if (!user.emailVerified) {
        errorRef.current.innerHTML = "Please verify your email before logging in.";
        await signOut(auth); // Log out unverified users
        return;
      }

      // Check if user data exists in Firestore
      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);

      if (!userSnap.exists()) {
        await setDoc(userRef, {
          email: user.email,
          createdAt: new Date(),
        });
        console.log("User data saved to Firestore");
      }

      console.log("Login successful:", user);

      if (user.email === "xtreamgym2615@gmail.com") {
        navigate("/Admin"); // Redirect to admin module
      } else {
        navigate("/Home"); // Redirect to user module
      }
    } catch (error) {
      console.error("Firebase Error:", error);
      if (error.code === "auth/wrong-password") {
        errorRef.current.innerHTML = "Incorrect password!";
      } else if (error.code === "auth/user-not-found") {
        errorRef.current.innerHTML = "No account found with this email!";
      } else if (error.code === "auth/invalid-email") {
        errorRef.current.innerHTML = "Invalid email format!";
      } else {
        errorRef.current.innerHTML = "Something went wrong. Try again!";
      }
    }
  };

  const handleForgotPassword = async () => {
    if (!mail) {
      errorRef.current.innerHTML = "Please enter your email to reset the password!";
      return;
    }
    try {
      await sendPasswordResetEmail(auth, mail);
      errorRef.current.innerHTML = "Password reset link sent! Check your email.";
      errorRef.current.style.color = "green";
    } catch (error) {
      console.error("Error sending reset email:", error);
      errorRef.current.innerHTML = "Failed to send reset email. Try again!";
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <div id="d1">
        <center>
          <h1 id="sih1">Login</h1>
        </center>
        <h3 id="sih3">Email</h3>
        <input
          type="email"
          id="inp1"
          required
          onKeyUp={(e) => setMail(e.target.value)}
          placeholder="Enter Your Email"
        />
        <h3 id="sih3">Password</h3>
        <input
          id="inp2"
          type="password"
          required
          onChange={(e) => setPass(e.target.value)}
          placeholder="Enter your password"
        />
        <p ref={errorRef} className="p" style={{ color: "red", fontWeight: "bolder" }}></p>
        <center>
          <button id="but2" type="submit">
            Submit
          </button>
          <p id="forgot-pass" onClick={handleForgotPassword} style={{ cursor: "pointer", color: "blue", textDecoration: "underline" }}>
            Forgot Password?
          </p>
        </center>
        <p onClick={() => navigate("/sign")} id="sip">
          Don't have an account? Sign up
        </p>
      </div>
    </form>
  );
}

export default Login;
