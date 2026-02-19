import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages-home/LandingPage";
import Login from "./pages-home/login";
import Signup from "./pages-home/signUp";
import Home from "./pages-home/Home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/auth" element={<Login />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/Home" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
