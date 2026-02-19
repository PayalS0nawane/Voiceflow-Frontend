
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import SpeechRecorder from "../components/SpeechRecorder";
import { logout } from "../services/logout";

const Home = () => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(()=>{
    const unsub = onAuthStateChanged(auth, (u) =>{
      if(!u){
        navigate("/");
      }else{
        setUser(u);
      }
      setLoading(false);
    });
    return unsub;
  }, []);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (!user) navigate("/");
      setLoading(false);
    });
    return unsub;
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* NAVBAR */}
      <header className="flex justify-between items-center px-8 py-4 bg-white shadow-sm">
        <h1 className="text-xl font-bold text-blue-600">
          VoiceFlow
        </h1>

        <button
          onClick={handleLogout}
          className="text-sm text-red-600 hover:underline"
        >
          Logout
        </button>
      </header>

      {/* <h1 className="text-xl font-semibold mb-4">
              Hey, {user?.displayName || "there"}
            </h1> */}
      {/* MAIN CONTENT */}
      <main className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* LEFT: RECORDER */}
        <section className="lg:col-span-2 bg-white rounded-2xl shadow p-6">
          <h2 className="text-xl font-semibold mb-4">
            Speech to Text
          </h2>
            
          <SpeechRecorder />
        </section>

        {/* RIGHT: INFO / HISTORY NOTE */}
        <aside className="bg-white rounded-2xl shadow p-6">
          <h3 className="text-lg font-semibold mb-3">
            How it works
          </h3>

          <ul className="space-y-3 text-sm text-gray-600">
            <li>🎤 Record live audio</li>
            <li>📁 Upload audio files</li>
            <li>🕒 View transcript history</li>
            <li>🔐 Secure & private</li>
          </ul>

          <div className="mt-6 p-4 bg-blue-50 rounded-lg text-sm text-blue-700">
            Tip: Speak clearly for best results.
          </div>
        </aside>
      </main>
    </div>
  );
};

export default Home;
