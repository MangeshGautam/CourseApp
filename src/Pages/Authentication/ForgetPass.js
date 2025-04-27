import React, { useState } from "react";
import { TextField, Button } from "@mui/material";
import { auth } from "../../Firebase";
import { sendPasswordResetEmail } from "firebase/auth";
import { Link } from "react-router-dom";

const ForgotPass = () => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [message, setMessage] = useState("");

  const handlePasswordReset = async () => {
    setEmailError("");
    setMessage("");

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email || !emailRegex.test(email)) {
      setEmailError("Enter a valid email address.");
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);
      setMessage("Password reset email sent! Check your inbox.");
    } catch (error) {
      setEmailError(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-blue-200 to-red-200">
      <div className="bg-white p-10 rounded-2xl shadow-lg max-w-lg w-full">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Reset Your Password
        </h2>

        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          className="mb-4"
          style={{ marginBottom: "20px" }}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={!!emailError}
          helperText={emailError || message}
        />

        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handlePasswordReset}
        >
          Send Reset Link
        </Button>

        <div className="flex justify-between mt-4">
          <Link to="/login" className="text-purple-600">Back to Login</Link>
          <Link to="/register" className="text-purple-600">Register</Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPass;
 