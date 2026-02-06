import { useState } from "react";
import Login from "./login";
import Signup from "./signUp";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";



const Auth = () => {
  const [mode, setMode] = useState("login");
  const navigate = useNavigate();

useEffect(() => {
  const unsub = onAuthStateChanged(auth, (user) => {
    if (user) {
      navigate("/home"); // 🔑 THIS WAS MISSING
    }
  });

  return unsub;
}, []);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center relative">
      
      {/* 🔙 Back button */}
      <button
        onClick={() => navigate("/")}
        className="absolute top-6 left-6 text-gray-600 hover:text-gray-900"
      >
        ← Back
      </button>

      <div className="w-full max-w-sm bg-white p-6 rounded-xl shadow-lg">
        {mode === "login" ? (
          <>
            <Login />
            <p className="text-sm text-center mt-4">
              Don’t have an account?{" "}
              <button
                onClick={() => setMode("signup")}
                className="text-indigo-600 font-medium"
              >
                Sign up
              </button>
            </p>
          </>
        ) : (
          <>
            <Signup />
            <p className="text-sm text-center mt-4">
              Already have an account?{" "}
              <button
                onClick={() => setMode("login")}
                className="text-indigo-600 font-medium"
              >
                Login
              </button>
            </p>
          </>
        )}
        
        
      </div>
    </div>
    
  );
};

export default Auth;
