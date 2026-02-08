import { auth } from "../firebase";

const BASE_URL = "https://voiceflow-backend-production.up.railway.app";

// 🎤 Send audio
export const sendAudio = async (audioBlob) => {
  const user = auth.currentUser;
  if (!user) throw new Error("Not authenticated");

  const token = await user.getIdToken();

  const formData = new FormData();
  formData.append("audio", audioBlob);

  const res = await fetch(`${BASE_URL}/api/speech`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  return res.json();
};

// 📜 Get transcripts
export const getTranscripts = async () => {
  const user = auth.currentUser;
  if (!user) return [];

  const token = await user.getIdToken();

  const res = await fetch(`${BASE_URL}/api/transcripts`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    console.error("Failed to fetch transcripts");
    return [];
  }

  const data = await res.json();
  return Array.isArray(data) ? data : [];
};

// 🗑 Delete transcript
export const deleteTranscript = async (id) => {
  const user = auth.currentUser;
  if (!user) throw new Error("Not authenticated");

  const token = await user.getIdToken();

  await fetch(`${BASE_URL}/api/transcripts/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};