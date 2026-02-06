import { useState } from "react";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

const provider = new GoogleAuthProvider(); 

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const[name, setName] = useState("");

  const navigate = useNavigate();

  // const handleEmailSignup = async (e) => {
  //   e.preventDefault();
  //   setError("");

  //   try {
  //     await createUserWithEmailAndPassword(auth, email, password);
  //     navigate("/home");
  //   } catch (err) {
  //     setError(err.message);
  //   }
  // };
  const handleEmailSignup = async (e) => {
  e.preventDefault();
  setError("");

  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    // ✅ SAVE NAME IN FIREBASE AUTH
    await updateProfile(userCredential.user, {
      displayName: name,
    });

    navigate("/home");
  } catch (err) {
    setError(err.message);
  }
};


  const handleGoogleSignup = async () => {
    try {
      await signInWithPopup(auth, provider);
      navigate("/home");
    } catch (err) {
      setError("Google signup failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-white px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        {/* BACK */}
        <button
          onClick={() => navigate("/auth")}
          className="text-sm text-blue-600 mb-4"
        >
          ← Back
        </button>

        <h2 className="text-3xl font-bold text-center mb-2">
          Create Account
        </h2>
        <p className="text-center text-gray-500 mb-6">
          Sign up to start using VoiceFlow
        </p>

        {/* GOOGLE SIGNUP */}
        <button
          onClick={handleGoogleSignup}
          className="w-full border py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-50 transition mb-4"
        >
          <span>🔵</span>
          Continue with Google
        </button>

        <div className="text-center text-gray-400 text-sm mb-4">
          OR
        </div>

        {/* EMAIL SIGNUP */}
        <form onSubmit={handleEmailSignup} className="space-y-4">
          <input 
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          /> 
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Create Account
          </button>
        </form>

        {error && (
          <p className="text-red-500 text-sm text-center mt-4">
            {error}
          </p>
        )}

        {/* LOGIN LINK */}
        <p className="text-sm text-center text-gray-600 mt-6">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/auth")}
            className="text-blue-600 cursor-pointer hover:underline"
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
};

export default Signup;

