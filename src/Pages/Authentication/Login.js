import React, { useState } from "react";
import { TextField, IconButton, InputAdornment, Button } from "@mui/material";
import { Visibility, VisibilityOff, Google } from "@mui/icons-material";
import { auth, googleProvider } from "../../Firebase";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [loginError, setLoginError] = useState("");

  const navigate = useNavigate();

  const handleLogin = async () => {
    setEmailError("");
    setLoginError("");

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email || !emailRegex.test(email)) {
      setEmailError("Enter a valid email");
      return;
    }

    if (!password || password.length < 6) {
      setLoginError("Password should be at least 6 characters");
      return;
    }

    try {
      const userinfo = await signInWithEmailAndPassword(auth, email, password);

      const token = userinfo.user.accessToken;

      localStorage.setItem("token", token);
      sessionStorage.setItem("email", email)

      alert("Login successful!");
      navigate("/home");
    } catch (error) {
      setLoginError(error.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {

      const userinfo = await signInWithPopup(auth, googleProvider);
      const token = userinfo.user.accessToken;
      const { displayName, email } = userinfo.user;
      sessionStorage.setItem("email", email)


      // console.log(userinfo, "Google User Information")
      // console.log(displayName, email, "Userinfo.user");
      

      localStorage.setItem("token", token);
      alert("Google login successful!");
      navigate("/home" );
    } catch (error) {
      setLoginError(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-blue-200 to-red-200">
      <div className="bg-white p-10 rounded-2xl shadow-lg max-w-lg w-full">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Login to your account
        </h2>

        <div className="flex flex-col justify-around ">
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
            error={!!loginError}
            helperText={loginError}
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
            onClick={handleLogin}
          >
            Login
          </Button>
        </div>

        <div className="flex items-center my-4">
          <div className="flex-grow h-px bg-gray-300"></div>
          <span className="px-2 text-gray-500 text-sm">or</span>
          <div className="flex-grow h-px bg-gray-300"></div>
        </div>

        <Button
          variant="outlined"
          fullWidth
          startIcon={<Google />}
          onClick={handleGoogleLogin}
        >
          Continue with Google
        </Button>
        <div className="flex justify-between mt-4">
          <Link to="/register" className="text-purple-600">Register</Link>
          
          <Link to="/register" className="text-purple-600"> Forgot Password </Link>

        </div>
      </div>
    </div>
  );
};

export default Login;
