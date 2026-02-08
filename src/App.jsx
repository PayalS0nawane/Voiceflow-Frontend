

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./Pages/LandingPage";
import Login from "./Pages/login";
import Signup from "./Pages/signUp";
import Home from "./pages/Home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/auth" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
