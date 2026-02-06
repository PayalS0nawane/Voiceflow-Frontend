import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyBM1G1FbqxrHuk3Tf2Qf7RscFZCWDljgNM",
  authDomain: "speech-to-text-2ca73.firebaseapp.com",
  projectId: "speech-to-text-2ca73",
  storageBucket: "speech-to-text-2ca73.firebasestorage.app",
  messagingSenderId: "89841948648",
  appId: "1:89841948648:web:c12a48ccc4f4f85fc9f65d"
};
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
