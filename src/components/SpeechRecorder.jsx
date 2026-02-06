import { useState, useRef, useEffect } from "react";
import { sendAudio, getTranscripts, deleteTranscript } from "../services/api";

const SpeechRecorder = () => {
  const [text, setText] = useState("");
  const [listening, setListening] = useState(false);
  const [history, setHistory] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [loadingHistory, setLoadingHistory] = useState(true);
  const [copied, setCopied] = useState(false);

  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

    useEffect(() => {
  const loadHistory = async () => {
    try {
      const data = await getTranscripts();
      // console.log("HISTORY FROM API 👉", data);
      setHistory(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("History error", err);
    } finally {
      setLoadingHistory(false);
    }
  };
  loadHistory();
}, []);


  // 🎤 RECORD
  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const mediaRecorder = new MediaRecorder(stream, {
      mimeType: "audio/webm;codecs=opus",
    });

    audioChunksRef.current = [];

    mediaRecorder.ondataavailable = (e) => {
      audioChunksRef.current.push(e.data);
    };

    mediaRecorder.onstop = async () => {
      const audioBlob = new Blob(audioChunksRef.current, {
        type: "audio/webm",
      });

      try {
        const res = await sendAudio(audioBlob);
        setText(res?.transcript || res?.message || "No speech detected");

        const updated = await getTranscripts();
        setHistory(Array.isArray(updated) ? updated : []);
      } catch {
        setText("Speech processing failed");
      }
    };

    mediaRecorder.start();
    mediaRecorderRef.current = mediaRecorder;
    setListening(true);
  };

  const stopRecording = () => {
    mediaRecorderRef.current?.stop();
    setListening(false);
  };

  // 📁 UPLOAD
  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    setText("Uploading and transcribing audio...");

    try {
      const res = await sendAudio(file);
      setText(res?.transcript || res?.message || "No speech detected");

      const updated = await getTranscripts();
      setHistory(Array.isArray(updated) ? updated : []);
    } catch {
      setText("Failed to process audio file");
    } finally {
      setUploading(false);
    }
  };

  //delete transcript
  const handleDelete = async(id)=>{
    try{
      await deleteTranscript(id);
      setHistory((prev)=> prev.filter((item)=>item.id !== id ));
    }catch{
      alert("Failed to delete transcript");
    }
  }
  // 📋 COPY
  const copyText = async (content) => {
    if (!content) return;
    await navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  // ⬇️ DOWNLOAD
  const downloadText = (content, filename = "transcript.txt") => {
    if (!content) return;
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();

    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* ACTION CARD */}
      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-lg font-semibold mb-4">
          Convert Speech to Text
        </h2>

        <div className="flex items-center gap-4">
          <button
            onClick={listening ? stopRecording : startRecording}
            disabled={uploading}
            className={`px-6 py-3 rounded-lg text-white font-medium transition ${
              listening
                ? "bg-red-500 hover:bg-red-600"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {listening ? "Stop Recording" : "Start Recording"}
          </button>

          <label className="cursor-pointer px-3 py-1 rounded-md bg blue-100 text-blue-700 hover:bg-blue-200 transition text-xs font-medium">
            Upload audio
            <input
              type="file"
              accept="audio/*"
              onChange={handleFileUpload}
              disabled={uploading}
              className="hidden"
            />
          </label>
        </div>

        {listening && (
          <p className="mt-3 text-sm text-blue-600">
            🎙️ Listening… speak clearly
          </p>
        )}

        {/* OUTPUT */}
        <div className="mt-6">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-sm font-medium text-gray-500">
              Transcript Output
            </h3>

            {text && (
              
              <div className="flex gap-3 text-sm">
                <button
                  onClick={() => copyText(text)}
                  className="px-3 py-1 rounded-md bg blue-100 text-blue-700 hover:bg-blue-200 transition text-xs font-medium"
                >
                  {copied ? "Copied!" : "Copy"}
                </button>

                <button
                  onClick={() =>
                    downloadText(text, "latest-transcript.txt")
                  }
                  className="px-3 py-1 rounded-md bg blue-100 text-blue-700 hover:bg-blue-200 transition text-xs font-medium"
                >
                  Download
                </button>
              </div>
            )}
          </div>

          <div className="min-h-[80px] border rounded-lg p-4 text-sm bg-gray-50">
            {text || "Your transcript will appear here..."}
          </div>
        </div>
      </div>

      {/* HISTORY */}
      <div className="bg-white rounded-xl shadow p-6">
        <h3 className="text-lg font-semibold mb-4">
          Recent Transcripts
        </h3>

        {loadingHistory && (
          <p className="text-sm text-gray-400">
            Loading history...
          </p>
        )}

        {!loadingHistory && history.length === 0 && (
          <p className="text-sm text-gray-500">
            No transcripts yet
          </p>
        )}

        <ul className="space-y-3 max-h-64 overflow-y-auto">
          {history.map((item) => (
          //  <li//thiz
          //     key={item.id}
          //     className="border rounded-lg p-3 text-sm bg-gray-50"
          //   >
          //     <p className="mb-2">{item.text}</p>

          //     <div className="flex gap-4 text-xs text-blue-600">
          //       <button
          //         onClick={() => copyText(item.text)}
          //         className="hover:underline"
          //       >
          //         Copy
          //       </button>
          //       <button
          //         onClick={() =>
          //           downloadText(
          //             item.text,
          //             `transcript-${item.id}.txt`
          //           )
          //         }
          //         className="hover:underline"
          //       >
          //         Download
          //       </button>
          //     </div>
          //   </li>//to this
              <li className="group relative rounded-xl border bg-white p-4 shadow-sm hover:shadow-md transition">

            <p className="text-sm text-gray-800 leading-relaxed">
                {item.text}
            </p>

            <div className="mt-3 flex justify-between items-center">
              <span className="text-xs text-gray-400">
                {item.createdAt?.toDate
                  ? item.createdAt.toDate().toLocaleString()
                  : ""}
              </span>

              <button
                onClick={() => handleDelete(item.id)}
                className="text-red-500 text-xs opacity-0 group-hover:opacity-100 transition"
              >
                Delete
              </button>
            </div>
            <div className="flex gap-4 text-xs text-blue-600">
                          <button
                  onClick={() => copyText(item.text)}
                  className="hover:underline"
                >
                  Copy
                </button>
                <button
                  onClick={() =>
                    downloadText(
                      item.text,
                      `transcript-${item.id}.txt`
                    )
                  }
                  className="hover:underline"
                >
                  Download
                </button>
              </div>

              </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SpeechRecorder;
