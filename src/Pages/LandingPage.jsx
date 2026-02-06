// import { useNavigate } from "react-router-dom";

// const Landing = () => {
//   const navigate = useNavigate();

//   return (
//     <div className="min-h-screen bg-gray-100 flex items-center justify-center">
//       <div className="max-w-xl bg-white p-8 rounded-xl shadow-lg text-center">
//         <h1 className="text-3xl font-bold text-gray-800 mb-4">
//           Speech to Text Converter 🎙️
//         </h1>

//         <p className="text-gray-600 mb-6">
//           Transform speech into text instantly.  
//           Record your voice, upload audio files, and access your full
//           transcription history anytime.
//         </p>

//         <ul className="text-left text-gray-700 mb-6 space-y-2">
//           <li>✅ Convert speech to text in real-time</li>
//           <li>✅ Upload audio files for transcription</li>
//           <li>✅ View and manage previous transcripts</li>
//         </ul>

//         <button
//           onClick={() => navigate("/auth")}
//           className="px-6 py-3 bg-indigo-600 text-white rounded-lg text-lg hover:bg-indigo-700 transition"
//         >
//           Get Started
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Landing;


import { useNavigate } from "react-router-dom";

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      {/* NAVBAR */}
      <nav className="flex justify-between items-center px-8 py-6">
        <h1 className="text-2xl font-bold text-blue-600">
          VoiceFlow
        </h1>

        <button
          onClick={() => navigate("/auth")}
          className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Get Started
        </button>
      </nav>

      {/* HERO */}
      <section className="flex flex-col-reverse md:flex-row items-center justify-between px-8 md:px-16 py-16 gap-10">
        {/* TEXT */}
        <div className="max-w-xl">
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">
            Convert Speech to Text <br />
            <span className="text-blue-600">Instantly</span>
          </h2>

          <p className="mt-6 text-gray-600 text-lg">
            Record live speech or upload audio files and get
            accurate text transcripts powered by AI.
          </p>

          <div className="mt-8">
            <button
              onClick={() => navigate("/auth")}
              className="px-8 py-3 bg-blue-600 text-white text-lg rounded-xl hover:bg-blue-700 transition"
            >
              Get Started
            </button>
          </div>
        </div>

        {/* ILLUSTRATION */}
        <div className="w-full md:w-1/2 flex justify-center">
          <img
            src="https://illustrations.popsy.co/blue/speech-to-text.svg"
            alt="Speech to Text Illustration"
            className="w-80 md:w-96"
          />
        </div>
      </section>

      {/* FEATURES */}
      <section className="px-8 md:px-16 py-16 bg-white">
        <h3 className="text-3xl font-bold text-center mb-12">
          What You Can Do
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Feature
            title="Live Recording"
            text="Speak directly into your microphone and get instant transcription."
            icon="🎤"
          />
          <Feature
            title="Upload Audio"
            text="Upload recorded audio files and convert them to text."
            icon="📁"
          />
          <Feature
            title="Transcript History"
            text="Access all your previous transcripts anytime, securely."
            icon="🕒"
          />
        </div>
      </section>

      {/* FOOTER */}
      <footer className="text-center py-6 text-gray-400 text-sm">
        © {new Date().getFullYear()} VoiceFlow. All rights reserved.
      </footer>
    </div>
  );
};

const Feature = ({ title, text, icon }) => (
  <div className="p-6 border rounded-xl shadow-sm hover:shadow-md transition">
    <div className="text-4xl mb-4">{icon}</div>
    <h4 className="text-xl font-semibold mb-2">{title}</h4>
    <p className="text-gray-600">{text}</p>
  </div>
);

export default Landing;
