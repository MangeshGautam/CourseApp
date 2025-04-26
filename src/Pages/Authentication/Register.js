import React, { useState } from "react";
import { TextField, IconButton, InputAdornment, Button } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { auth, db } from "../../Firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setconfirmpassword] = useState("");

  const [emailError, setEmailError] = useState("");
  const [registerError, setRegisterError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    setEmailError("");
    setRegisterError("");

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email || !emailRegex.test(email)) {
      setEmailError("Enter a valid email");
      return;
    }

    if (!password || password.length < 6 || !confirmpassword || confirmpassword.length <6) {
      setRegisterError("Password should be at least 6 characters");
      return;
    }

    if(password === confirmpassword) {


      try {
        await createUserWithEmailAndPassword(auth, email, password);
        await setDoc(doc(db, "users", email), {
          email: email,
        });
        
        alert("Registration successful!");

        setEmail("");
        setPassword("");
        setconfirmpassword("");
        navigate("/login")
      } catch (error) {
        setRegisterError(error.message);
      }

    }else{
      alert("Password and Confirm password are mismatch ")
    }

   
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-blue-200 to-red-200">
      <div className="bg-white p-10 rounded-2xl shadow-lg max-w-lg w-full">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Create a new account
        </h2>

        <div className="flex flex-col justify-around">
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            className="mb-4"
            style={{ marginBottom: "20px" }}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={!!emailError}
            helperText={emailError}
          />

          <TextField
            label="Password"
            variant="outlined"
            fullWidth
            className="mb-4"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={!!registerError}
            helperText={registerError}
            style={{ marginBottom: "20px" }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword((prev) => !prev)}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <TextField
            label=" Confirm Password"
            variant="outlined"
            fullWidth
            className="mb-4"
            type={showPassword ? "text" : "password"}
            value={confirmpassword}
            onChange={(e) => setconfirmpassword(e.target.value)}
            error={!!registerError}
            helperText={registerError}
            style={{ marginBottom: "20px" }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword((prev) => !prev)}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <Button
            variant="contained"
            color="primary"
            fullWidth
            className="mb-4"
            onClick={handleRegister}
          >
            Register
          </Button>

          <div className="flex justify-between mt-4">
            <Link to="/login" className="text-purple-600 underline text-lg">
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
