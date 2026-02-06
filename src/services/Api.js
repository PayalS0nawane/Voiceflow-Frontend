
import { auth } from "../firebase";

export const sendAudio = async (audioBlob) => {
  const user = auth.currentUser;
  if (!user) throw new Error("Not authenticated");

  const token = await user.getIdToken();

  const formData = new FormData();
  formData.append("audio", audioBlob);

  const res = await fetch("http://localhost:5000/api/speech", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  return res.json();
};


export const getTranscripts = async () => {
  const user = auth.currentUser;
  if (!user) return [];

  const token = await user.getIdToken();

  const res = await fetch("http://localhost:5000/api/transcripts", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    console.error("Failed to fetch transcripts");
    return [];
  }

  const data = await res.json();

  // 🔑 ENSURE ARRAY
  return Array.isArray(data) ? data : [];
};

export const deleteTranscript = async(id) =>{
  const user = auth.currentUser;
  const token = await user.getIdToken();

  await 
  fetch(`https://localhost:5000/api/transcript/${id}`,{
    method: "DELETE",
    headers:{
      Authorization: `Bearer ${token}`,
    },
  });
};  
  